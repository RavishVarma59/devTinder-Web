import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, Subject, tap } from 'rxjs';
import { BASE_URL } from '../utils/constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    // private apiUrl = 'https://api.example.com/data'; // Replace with your API endpoint

  private userData  = new BehaviorSubject<any>(null);
  user$ = this.userData.asObservable();

  private router = inject(Router);

  constructor(private http: HttpClient) { }

  getData(apiUrl:string): Observable<any> {
      return this.http.get<any>(apiUrl, {
        withCredentials: true
      });
  }

  isLoggedIn(): boolean {
  return !!this.userData.value;
  }

  restoreUser(): Observable<any> {
    const viewUserProfile = BASE_URL + "/profile/view";
    return this.http.get<any>(viewUserProfile, { withCredentials: true }).pipe(
      tap({
        next: (res) => {
          const user = res?.data || null;
          this.userData.next(user);
        }
      }),
      map(res => res?.data || null),
      catchError((err) => {
        this.userData.next(null);
        const currentUrl = this.router.url;
        if (err.status === 401 && currentUrl !== '/login') {
          this.router.navigate(['/login']);
        }
        return of(null);
      }));
  }

  login(apiUrl:string ,item: any): Observable<any> {
    return this.http.post<any>(apiUrl, item,{
      withCredentials: true
    }).pipe(
      tap({
      next : (res) => {
        const user = res.data;
        this.userData.next(user);
        this.router.navigate(['/']);
      }, 
      error: (error) => {
        this.userData.next(null);
        console.error(error);
      }
    }));;
  }

  logout():Observable<any>{
    const logoutUrl = BASE_URL + "/logout"
    return this.http.post(logoutUrl, {}, {withCredentials: true}).pipe(
      tap({
        next: (res)=>{
            this.userData.next(null);
            this.router.navigate(['/login']);
        },
        error: (err)=>{
          console.error(err);
        }
      }));
  }
}
