import { Component, OnInit } from '@angular/core';
import { BASE_URL } from '../../utils/constants';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';

@Component({
  selector: 'app-requests',
  imports: [CommonModule],
  templateUrl: './requests.html',
  styleUrl: './requests.css'
})
export class Requests implements OnInit{

  requests:any[]= []
  inProgress:boolean = false;

  constructor(private _https:HttpClient){

  }
  ngOnInit(): void {
    this.inProgress = true;
    const requesturl = BASE_URL+ "/user/requests/received";
    this._https.get(requesturl,{withCredentials:true}).pipe(tap((res)=>{
      this.inProgress = false;
    })).subscribe({
      next: (res:any)=>{
        const resp:any[] = res.Data || [];
        // resp.forEach(entry=>{
        //   if(entry?.fromUserId){
        //     this.requests.push(entry.fromUserId);
        //   }
        // });
        this.requests = resp;
      },
      error: (err)=>{
        console.error(err);
      }
    })

  }

  reviewRequest(status:string,_id:any){

    const reviewUrl = BASE_URL + "/request/review/" + status + "/" + _id;

    this._https.post(reviewUrl,{},{withCredentials:true}).pipe(tap((res)=>{

    })).subscribe({
      next: (res)=>{
        this.requests = this.requests.filter((value)=>{
          return value?._id !== _id;
        })
      },
      error: (err)=>{
        console.error(err);
      }
    })
  }

}
