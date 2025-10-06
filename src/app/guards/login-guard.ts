import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../services/api';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { map, Observable, of, tap } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state):Observable<any> => {
  const authService = inject(ApiService);
  const router = inject(Router);
  if(authService.isLoggedIn()){
    router.navigate(['/']);
    return of(false) ;
  }
  
  return authService.restoreUser().pipe(
    map((res)=>{
      if(res){
        router.navigate(['/']);
        return false;
      } else {
        return true;
      }
    })
  )
  
};
