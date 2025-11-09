import { Routes } from '@angular/router';
import { Profile } from './components/profile/profile';
import { Login } from './components/login/login';
import { Feed } from './components/feed/feed';
import { NotFoundError } from 'rxjs';
import { loginGuard, authGuard } from './guards/login-guard';
import { Privacy } from './components/policy/privacy/privacy';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

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
            {
                path: "requests",
                loadComponent: () => import("./components/requests/requests").then((M) => M.Requests)
            },
            {
                path: "connections",
                loadComponent: () => import("./components/connections/connections").then(M => M.Connections)
            },
            {
                path: "chat/:userId",
                loadComponent: () => import("./components/chat/chat").then(M=> M.Chat)
            }

        ]
    },
    {
        path: "pages",
        loadChildren: () => import("./components/policy/policy-module").then(M => M.PolicyModule)
    },
    {
        path: "page-not-found",
        component: PageNotFoundComponent
    },
    {
        path: "**",
        redirectTo: "page-not-found"
    }
];
