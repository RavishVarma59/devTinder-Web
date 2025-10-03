import { Routes } from '@angular/router';
import { App } from './app';
import { Profile } from './profile/profile';
import { Login } from './login/login';

export const routes: Routes = [
    {
        path : "login",
        component : Login
    },
    {
        path : "profile",
        component : Profile
    }
];
