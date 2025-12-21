import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { io } from "socket.io-client";
import { BASE_URL } from '../../utils/constants';
import { ApiService } from '../../services/api';
import { ChatService } from './chat.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-chat',
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat implements  AfterViewInit, OnInit, OnDestroy{

  chatWithUserId: string | undefined
  chatWithUserName: any;

  userInfo: any;
  chatWithUserInfo: any;

  userId: any;
  chatList: any = [];
  newMessage = '';

  socket = io(BASE_URL);

  @ViewChild("chats")
  private chats!: ElementRef;

  constructor(private activateRoute: ActivatedRoute, private _userService: ApiService,
    private chatService : ChatService
  ){
    this.activateRoute.params.subscribe((params:any)=>{
      this.chatWithUserId = params.userId;
      this.chatWithUserName = params.name;
    })
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }

  ngOnInit(): void {
    this.chatService.getChatHistory(this.chatWithUserId).subscribe((res) => {

      const peopleInChat = res?.peopleInChats || [];
      peopleInChat.forEach((p: any) => {
        if (p._id === this.chatWithUserId) {
          this.chatWithUserInfo = p;
        }
      });

      const messages = res?.messages || [];

      messages.forEach((m: any) => {

        const { _id, firstName, lastName, photoUrl } = m?.senderId || {};
        const messageText = m?.text || "";
        const name = firstName + " " + lastName;

        if (_id === this.userInfo._id) {
          this.chatList.push({
            name: this.getInitials(name), message: messageText, userType: "to", img: photoUrl
          },)
        } else {
          this.chatList.push({
            name: this.getInitials(name), message: messageText, userType: "from", img: photoUrl
          },)
        }
      });

      setTimeout(() => {
            this.scrollToBottom(this.chats);
          }, 100);

    });

    this._userService.user$.subscribe((user) => {
      if (user?._id) {
        this.userInfo = user;
        this.setUpSocketListener();
      }
    });

    
  }

  setUpSocketListener(){
            this.socket.emit("joinchat", this.userInfo?._id, this.chatWithUserId);

        this.socket.on("receiveMessage", (arg) => {
          const senderUserId = arg?.userId;
          const message = arg?.text;
          const name = arg?.name;
          if(senderUserId === this.userInfo?._id){
            this.chatList.push({ 
              name: this.getInitials(name), message: message, userType: "to", img: this.userInfo?.photoUrl },)
          } else {
            this.chatList.push({ 
              name: this.getInitials(name), message: message, userType: "from", img: this.chatWithUserInfo?.photoUrl },)
          }
          setTimeout(() => {
            this.scrollToBottom(this.chats);
          }, 0);
        })
  }

  send(event: any) {
    if(this.newMessage){
      const senderName = (this.userInfo?.firstName + " " + this.userInfo?.lastName).trim();
      this.socket.emit("sendMessage", this.userInfo?._id, this.chatWithUserId, this.newMessage,senderName);
      this.newMessage = "";
    }
  }

  ngAfterViewInit(): void {
    if (this.chats) {
      this.scrollToBottom(this.chats);
    }
  }


  scrollToBottom(container: ElementRef){
    container.nativeElement.scrollTo({left: 0 , top: container.nativeElement.scrollHeight, behavior: 'smooth'});
  }



  getInitials(name: string) {
    let initials = "";
    let nameArray = name.split(" ");
    nameArray.forEach((n)=>{
      if(n && n.charAt(0)){
        initials += n.charAt(0);
      }
    });
    return initials.toUpperCase();
  }

}
