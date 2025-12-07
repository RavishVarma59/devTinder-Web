import { Component, OnInit } from '@angular/core';
import { BASE_URL } from '../../utils/constants';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import { ChatService } from '../chat/chat.service';

@Component({
  selector: 'app-connections',
  imports: [CommonModule],
  templateUrl: './connections.html',
  styleUrl: './connections.css'
})
export class Connections implements OnInit {

  connections: any[] = [];
  inProgress: boolean = false;

  constructor(private _https: HttpClient, private chatService: ChatService) {

  }
  ngOnInit(): void {
    const connectionsUrl = BASE_URL + "/user/connections";
    this.inProgress = true;
    this._https.get(connectionsUrl, { withCredentials: true }).pipe(tap((res) => {
      this.inProgress = false
    })).subscribe({
      next: (res: any) => {

        this.connections = res.Data || [];
      },
      error: (err) => {
        this.connections = [];
        console.error(err);
      }
    })

  }

  chatWithUser(item:any){
    if(item?._id){
      this.chatService.chatWithUser.next(item);
      window.location.href = `/chat/${item._id}`
    }
  }


}
