import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    // private apiUrl = 'https://api.example.com/data'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getData(apiUrl:string): Observable<any> {
    return this.http.get<any[]>(apiUrl);
  }

  postData(apiUrl:string ,item: any): Observable<any> {
    console.log("post ")
    return this.http.post<any>(apiUrl, item,{
      withCredentials: true
    });
  }
}
