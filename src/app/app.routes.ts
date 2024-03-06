import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthGuard } from './core/auth/auth.guard';
import { dashboardGuard, loginGuard } from './core/auth/login.guard';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { paths } from './shared/enums/routePaths';

export const routes: Routes = [
    { path: paths.defaultPath, redirectTo: paths.auth, pathMatch: 'full', },
    { path: paths.auth, component: LoginComponent, pathMatch: 'full', canActivate: [loginGuard] },
    { path: paths.dashboard, component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard], canDeactivate: [dashboardGuard] },
    { path: paths.notFound, component: NotFoundComponent },
    { path: paths.wildRoute, redirectTo: paths.notFound }
];
