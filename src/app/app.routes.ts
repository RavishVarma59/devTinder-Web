import { Routes } from '@angular/router';
import { App } from './app';
import { Profile } from './components/profile/profile';
import { Login } from './components/login/login';

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
