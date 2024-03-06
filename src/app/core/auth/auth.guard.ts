import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

//Guard to check if user is authenticated or not
export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const authenticated = authService.isAuthenticated();

  if (!authenticated) {
    return router.navigate(['/']);
  } else {
    return true;
  }
};
