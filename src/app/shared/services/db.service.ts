import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Hobbies, Roles, User, UserHobbies, UserRoles } from '../models/common.model';
import { UsersData } from '../constants/users';
import { rolesData, userRolesData } from '../constants/userRoles';
import { UserHobbiesData, hobbiesData } from '../constants/hobbies';

@Injectable({
  providedIn: 'root'
})
export class DbService extends Dexie {

  users!: Table<User, number>;
  roles!: Table<Roles, number>;
  hobbies!: Table<Hobbies, number>;
  userRoles!: Table<UserRoles, number>;
  userHobbies!: Table<UserHobbies, number>;

  constructor() {
    super('DexieDB');

    this.version(1).stores({
      users: '++id, email',
      roles: 'id,name',
      hobbies: 'id',
      userRoles: '++id,userId,roleId',
      userHobbies: '++id,userId,hobbyId'
    });

    // Populate the database
    this.populate();

  }

  //To add dummy data to database
  async populate(): Promise<void> {
    try {
      const usersCount = await this.users.count();
      if (usersCount === 0) {
        await db.users.bulkAdd(UsersData);
      }

      const rolesCount = await this.roles.count();
      if (rolesCount === 0) {
        await db.roles.bulkAdd(rolesData);
      }
      const hobbiesCount = await this.hobbies.count();
      if (hobbiesCount === 0) {
        await db.hobbies.bulkAdd(hobbiesData);
      }
      const userRolesCount = await this.userRoles.count();
      if (userRolesCount === 0) {
        await db.userRoles.bulkAdd(userRolesData);
      }
      const userHobbiesCount = await this.userHobbies.count();
      if (userHobbiesCount === 0) {
        await db.userHobbies.bulkAdd(UserHobbiesData);
      }
    } catch (error) {
      console.error('Error populating database:', error);
    }
  }
}
export const db = new DbService();