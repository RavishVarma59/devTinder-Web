import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BASE_URL } from '../../utils/constants';
import { catchError, of, tap } from 'rxjs';
import { Card } from '../card/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed',
  imports: [Card, CommonModule],
  templateUrl: './feed.html',
  styleUrl: './feed.css'
})
export class Feed implements OnInit {

  feedApi: string = BASE_URL + "/user/feed";
  feedData: any;

  firstName: any;
  lastName: any;
  photoUrl: any;
  age: any;
  gender: any;
  about: any;

  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    this.http.get(this.feedApi, { withCredentials: true }).pipe(
      tap({
        next: (res: any) => {
          console.log("res ", res);
          this.feedData = res?.data;

          this.firstName = this.feedData[0].firstName;
          this.lastName = this.feedData[0].lastName;
          this.photoUrl = this.feedData[0].photoUrl;
          this.age = this.feedData[0].age;
          this.about = this.feedData[0].about;
          this.gender = this.feedData[0].gender;
        }
      }),
      catchError((err) => {
        console.log(err);
        return of(null)
      })
    ).subscribe();
  }

}
