import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { io } from "socket.io-client";
import { BASE_URL } from '../../utils/constants';
import { ApiService } from '../../services/api';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat implements  AfterViewInit, OnInit, OnDestroy{

  chatWithUserId: string | undefined
  userId: any;
  chatList = [
    { name: this.getInitials("Bob"), message: "Hey Bob, how's it going?", userType: "from", img: "" },
    { name: this.getInitials("Bob"), message: "Hi Alice! I'm good, just finished a great book. How about you?", userType: "to", img: ""  },
    { name: this.getInitials("Bob"), message: "That book sounds interesting! What's it about?", userType: "from", img: "" },
    { name: this.getInitials("Bob"), message: "It's about an astronaut stranded on Mars, trying to survive. Gripping stuff!", userType: "to", img: "" },
    { name: this.getInitials("Bob"), message: "I'm intrigued! Maybe I'll borrow it from you when you're done?", userType: "from", img: "" },
    { name: this.getInitials("Bob"), message: "Of course! I'll drop it off at your place tomorrow.", userType: "to", img: "" },
    { name: this.getInitials("Bob"), message: "Thanks, you're the best!", userType: "from", img: "" },
    { name: this.getInitials("Bob"), message: "Anytime! Let me know how you like it. 😊", userType: "to", img: "" },
    { name: this.getInitials("Bob"), message: "So, pizza next week, right?", userType: "from", img: "" },
    { name: this.getInitials("Bob"), message: "Absolutely! Can't wait for our pizza date. 🍕", userType: "to", img: "" },
    { name: this.getInitials("Bob"), message: "Hoorayy!!", userType: "from", img: "" },
  ];

  socket = io(BASE_URL);

  @ViewChild("chats")
  private chats!: ElementRef;

  constructor(private activateRoute: ActivatedRoute, private _userService: ApiService,
    private chatService : ChatService
  ){
    // console.log(this.activateRoute.snapshot.paramMap.get("chatWithUserId"));
    this.activateRoute.params.subscribe((params:any)=>{
      this.chatWithUserId = params.userId;
    })
  }

  ngOnDestroy(): void {
    this.socket.disconnect()
  }

  ngOnInit(): void {
    this.chatService.chatWithUser$.subscribe((res)=>{
      console.log("chat with user : ", res)
    })

    this._userService.user$.subscribe((user) => {

      if (user?._id) {
        this.userId = user;

        // this.socket.on("connection",(arrg)=>{
        //   console.log("connection : ", arrg)
        // })

        // this.socket.on("joinchat", (arg) => {
        //   console.log(arg); // world
        // });
        // console.log(" use Id : ", this.userId)
        this.socket.emit("joinchat", this.userId?._id, this.chatWithUserId);

        this.socket.on("receiveMessage", (arg) => {
          console.log("receiveMessage :", arg);
          const senderUserId = arg?.userId;
          const message = arg?.text;
          if(senderUserId === this.userId?._id){
            // this.chatList.push({
              
            // })
          }
        })



      }
    })
    // this.socket.on("connection", (socket) => {
    //   console.log("socket : ", socket.id); // x8WIv7-mJelg7on_ALbx
    // });


  }

  send(event: any) {
    console.log("send ")
    const senderName = (this.userId?.firstName + " " + this.userId?.lastName).trim();
    this.socket.emit("sendMessage", this.userId?._id, this.chatWithUserId, "hii world",senderName);
    // this.socket.on("receiveMessage", (arg)=>{
    //   console.log("receiveMessage :",arg)
    // })
    if (this.chats) {
      this.scrollToBottom(this.chats);
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

  messages = [
    { text: 'Hey, how are you?', isSent: false },
    { text: 'I’m good, thanks! You?', isSent: true },
    { text: 'Doing great! Working on the new project.', isSent: false },
  ];

  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ text: this.newMessage, isSent: true });
      this.newMessage = '';
      // Scroll to bottom or trigger backend send logic here
    }
  }

  getInitials(firstName: string,lastName?: string) {
    let initials = "";
    if(firstName){
      initials += firstName.charAt(0);
    } if(lastName){
      initials += lastName.charAt(0);
    }
    // const initials = fullName[0].charAt(0) + fullName.charAt(0);
    return initials.toUpperCase();
  }

}
