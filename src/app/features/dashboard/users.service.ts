import { EventEmitter, Injectable } from '@angular/core';
import { db } from '../../shared/services/db.service';
import { Hobbies, Roles, UserHobbies } from '../../shared/models/common.model';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Messages } from '../../shared/enums/enumLists';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  dataSourceUpdated: EventEmitter<void> = new EventEmitter();
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  dataSubject = new Subject<any>();
  data$ = this.dataSubject.asObservable();

  constructor(private _snackBar: MatSnackBar) { }

  async getUsers(): Promise<{
    role: string;
    id?: number;
    name: string;
    email: string;
    password: string;
    gender: string;
    dob: Date;
  }[]> {
    try {
      const users = await db.users.toArray();
      const usersWithRoles = await Promise.all(users.map(async (user) => {
        const userRole = await db.userRoles.where({ userId: user.id }).first();
        if (userRole) {
          const role = await db.roles.get(userRole.roleId);
          return { ...user, role: role.name };
        } else {
          return { ...user, role: 'Unknown' }; // Default role name if no role found
        }
      }));
      return usersWithRoles;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getTeachers(): Promise<{
    role: string;
    id?: number;
    name: string;
    email: string;
    password: string;
    gender: string;
    dob: Date;
  }[]> {
    try {
      const teachers = (await this.getUsers()).filter(user => user.role === 'Teacher');
      return teachers;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getStudents(): Promise<{
    role: string;
    id?: number;
    name: string;
    email: string;
    password: string;
    gender: string;
    dob: Date;
  }[]> {
    try {
      const teachers = (await this.getUsers()).filter(user => user.role === 'Student');
      return teachers;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getRoles(): Promise<Roles[]> {
    try {
      return db.roles.toArray();
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getHobbies(): Promise<Hobbies[]> {
    try {
      const hobbies = await db.hobbies.toArray();
      return hobbies;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async addUser(user: any): Promise<void> {
    try {
      const existingUser = await db.users.where({ email: user.email }).toArray();
      if (existingUser.length > 0) {
        this.openSnackBar(Messages.UserAlreadyExists);
        return;
      }
      const newUser = await db.users.add({
        name: user.name,
        email: user.email,
        password: user.password,
        gender: user.gender,
        dob: user.dob,
      })
      await db.userRoles.add({
        userId: newUser,
        roleId: user.role,
      })
      user.hobbies.forEach(async (isSelected, index) => {
        if (isSelected) {
          await db.userHobbies.add({
            userId: newUser,
            hobbyId: index + 1,
          });
        }
      });
      this.openSnackBar(Messages.UserAdded);
      this.dataSourceUpdated.emit();
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async getUserHobbies(userId: number): Promise<UserHobbies[]> {
    try {
      const userHobbies = await db.userHobbies.where({ userId: userId }).toArray();
      return userHobbies;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async updateUser(userId: number, user: any): Promise<void> {
    try {
      await db.users.update(userId, {
        name: user.name,
        email: user.email,
        gender: user.gender,
        dob: user.dob,
      });
      // Clear existing user hobbies
      await db.userHobbies.where({ userId }).delete();

      // Add updated user hobbies
      await user.hobbies.forEach(async (isSelected: boolean, index: number) => {
        if (isSelected) {
          await db.userHobbies.add({
            userId,
            hobbyId: index + 1,
          });
        }
      });
      this.dataSourceUpdated.emit();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(userId: number): Promise<void> {
    try {
      // Delete the user from the database
      await db.users.delete(userId);
      // Delete user roles associated with the user
      await db.userRoles.where({ userId }).delete();
      // Delete user hobbies associated with the user
      await db.userHobbies.where({ userId }).delete();
      this.dataSourceUpdated.emit();
    } catch (error) {
      console.log(error);
    }
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4000,
    });
  }
}
