import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BASE_URL } from '../../utils/constants';
import { BehaviorSubject, catchError, of, Subject, tap } from 'rxjs';
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
  _id:any;

  userCardSubject = new BehaviorSubject<any>(null);
  removeFeedDataSubject = new Subject<any>();

  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    this.getFeedData();
    this.cardDataSubscriber();
    this.removeFromFeedData();
  }

  getFeedData(): void {
    this.http.get(this.feedApi, { withCredentials: true }).pipe(
      tap({
        next: (res: any) => {
          console.log("res ", res);
          this.feedData = res?.data || [];
          if (this.feedData && this.feedData.length > 0) {
            this.userCardSubject.next(this.feedData[0]);
          } else {
            this.userCardSubject.next({});
          }
        }
      }),
      catchError((err) => {
        console.log(err);
        this.feedData = [];
        return of(null)
      })
    ).subscribe();
  }

  cardDataSubscriber(): void{
    this.userCardSubject.subscribe((res) => {
      this.firstName = res?.firstName || null;
      this.lastName = res?.lastName || null;
      this.photoUrl = res?.photoUrl || null;
      this.age = res?.age || null;
      this.about = res?.about || null;
      this.gender = res?.gender || null;
      this._id = res?._id || null;
    });
  }

  removeFromFeedData(): void{
    this.removeFeedDataSubject.subscribe((id)=>{
      if(id){
        this.feedData = this.feedData.filter((res:any)=>res._id !== id);
      }
      if(this.feedData && this.feedData.length > 0){
        this.userCardSubject.next(this.feedData[0]);
      } else {
        this.userCardSubject.next(null);
      }
    })
  }

  removeCardFromFeed(id:any){
    if(id){
      this.removeFeedDataSubject.next(id);
    }
  }

}
