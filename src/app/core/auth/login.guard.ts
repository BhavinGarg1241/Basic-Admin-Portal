import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Messages } from '../../shared/enums/enumLists';

//Guard to prevent user to redirect to login page by mistake
export const dashboardGuard: CanDeactivateFn<unknown> = () => {
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    // If authenticated, prevent navigation and prompt for logout confirmation
    const shouldLogout = confirm(Messages.Confirmlogout);
    if (shouldLogout) {
      authService.logout();
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

//Guard to prevent user to redirect to login page if already authenticated
export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const authenticated = authService.isAuthenticated();

  if(!authenticated){
    return true;
  }else{
    router.navigate(['/dashboard']);
    return false;
  }
};
