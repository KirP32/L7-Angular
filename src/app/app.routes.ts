import { Routes } from '@angular/router';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { authGuard } from './auth/guards/auth.guard';
import { LogoutComponent } from './auth/logout/logout.component';
import { nonAuthGuard } from './auth/guards/non-auth.guard';

export const routes: Routes = [
    {
        path: 'main',
        component: MainScreenComponent,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [nonAuthGuard]
    },
    {
        path: 'register',
        component: SignUpComponent,
        canActivate: [nonAuthGuard]
    },
    {
        path: 'logout',
        component: LogoutComponent,
        canActivate: [authGuard]
    },
];