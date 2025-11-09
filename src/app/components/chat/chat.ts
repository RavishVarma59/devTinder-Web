import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  imports: [],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat {

  userId: string | undefined

  constructor(private activateRoute: ActivatedRoute){
    // console.log(this.activateRoute.snapshot.paramMap.get("userId"));
    this.activateRoute.params.subscribe((params:any)=>{
      this.userId = params.userId;
    })

  }

}
