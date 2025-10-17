import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card implements OnInit {


  @Input()
  firstName: string | undefined
  @Input()
  age: string | undefined
  @Input()
  gender: string | undefined
  @Input()
  photoUrl: string | undefined
  @Input()
  about: string | undefined

  constructor(){

  }
  ngOnInit(): void {

  }

}
