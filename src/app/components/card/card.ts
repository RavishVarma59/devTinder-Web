import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BASE_URL } from '../../utils/constants';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card implements OnInit {


  @Input()
  firstName: string | undefined;
  @Input()
  age: string | undefined;
  @Input()
  gender: string | undefined;
  @Input()
  photoUrl: string | undefined;
  @Input()
  about: string | undefined;
  @Input()
  _id: any;

  @Output()
  removeCard = new EventEmitter<any>();

  constructor(private https: HttpClient) {

  }
  ngOnInit(): void {

  }

  actionOnCard(status: any): void {
    if (this._id) {
      const url = BASE_URL + "/request/send/" + status + "/" + this._id;

      this.https.post(url, {}, { withCredentials: true }).subscribe({
        next: (res) => {
          this.removeCard.emit(this._id);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

}
