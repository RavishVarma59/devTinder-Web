import { Routes } from '@angular/router';
import { App } from './app';
import { Profile } from './components/profile/profile';
import { Login } from './components/login/login';
import { Feed } from './components/feed/feed';
import { NotFoundError } from 'rxjs';
import { loginGuard, authGuard } from './guards/login-guard';

export const routes: Routes = [
    {
        path: "login",
        component: Login,
        canActivate: [loginGuard]
    },
    {
        path: '',
        canActivate: [authGuard],
        children: [
            {
                path: "",
                component: Feed
            },
            {
                path: "profile",
                component: Profile
            },
        ]
    },
    {
        path: "**",
        component: NotFoundError
    }
];
