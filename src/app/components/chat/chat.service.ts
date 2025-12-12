// 📄 src/app/basic-data-store.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ChatService {
    chatWithUser  = new BehaviorSubject<any>(null);
    chatWithUser$ = this.chatWithUser.asObservable();
    
    constructor(){
       
    }
}