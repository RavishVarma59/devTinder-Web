import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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

  restoreUser (): any {
    const viewUserProfile = BASE_URL + "/profile/view";
    const user = this.http.get<any>(viewUserProfile, { withCredentials : true}).subscribe({
      next : (res) => {
        const user = res.data;
        this.userData.next(user);
      },
      error : (error) => {
        this.userData.next(null);
        if(error.status === 401){
          this.router.navigate(['/login']);
        } 
      }
    });
  }

  login(apiUrl:string ,item: any): void {
    const user =this.http.post<any>(apiUrl, item,{
      withCredentials: true
    }).subscribe({
      next : (res) => {
        const user = res.data;
        this.userData.next(user);
        this.router.navigate(['/']);
      }, 
      error: (error) => {
        this.userData.next(null);
        console.error(error);
      }
    });
  }
}
