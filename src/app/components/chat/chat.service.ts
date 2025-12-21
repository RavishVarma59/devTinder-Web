// 📄 src/app/basic-data-store.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BASE_URL } from '../../utils/constants';
@Injectable({ providedIn: 'root' })
export class ChatService {
    chatWithUser  = new BehaviorSubject<any>(null);
    chatWithUser$ = this.chatWithUser.asObservable();
    
    constructor(private http: HttpClient) {
       
    }

    getChatHistory(chatWithUserId: any): Observable<any>{
        const getChatUrl = BASE_URL + "/getmessages";
        return this.http.post(getChatUrl,{chatWithUserId}, { withCredentials: true } );
    }
    }
