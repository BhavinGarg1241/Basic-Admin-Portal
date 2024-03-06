import { Injectable } from '@angular/core';
import { db } from '../../shared/services/db.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Messages } from '../../shared/enums/enumLists';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private cookieService: CookieService) { }

  async login(credentials: { email: string, password: string }) {
    try {
      const validUser = await db.users.where({ email: credentials.email }).toArray();
      if (validUser && validUser.length > 0) {
        if (validUser[0].password === credentials.password) {
          const allowedRoleId = await db.roles.where({ name: "Admin" }).toArray();  //Fetching role id from database for the role Admin
          const isAdmin = await db.userRoles.where({ userId: validUser[0].id, roleId: allowedRoleId[0].id }).first(); //Checking if the user is admin or not in database
          if (isAdmin) {
            this.cookieService.set('isLoggedIn', 'true', 1 / 24);
            return true;
          } else {
            return Messages.AccessDenied;
          }
        } else {
          return Messages.InvalidCredentials;
        }
      }
      return Messages.UserDoesNotExist;
    } catch (error) {
      console.log(error);
      return Messages.UnknownError;
    }
  }

  isAuthenticated(): string {
    return this.cookieService.get('isLoggedIn');
  }

  logout(): void {
    this.cookieService.delete('isLoggedIn');
    this.router.navigate(['/']);
  }
}
