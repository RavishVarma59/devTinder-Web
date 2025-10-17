import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../services/api';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { map, Observable, of, tap } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state):Observable<any> => {
  const authService = inject(ApiService);
  const router = inject(Router);
  console.log("login auth")
  if(authService.isLoggedIn()){
    router.navigate(['/']);
    return of(false) ;
  } else{
    return of(true);
  }
};

export const authGuard : CanActivateFn = (route,state):Observable<any>=>{
    const authService = inject(ApiService);
    console.log("home ")
    const router = inject(Router);
    if(!authService.isLoggedIn()){
      router.navigate(['/login']);
      return of(false) ;
    } else{
      return of(true);
    }
}
