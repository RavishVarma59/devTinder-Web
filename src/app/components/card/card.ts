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


  startX: number = 0;
  currentX: number = 0;
  pointerId: number = undefined as any;
  isDragging: boolean = false;
  isAnimatingOut: boolean = false;

  threshold: number = 180; // Minimum distance to consider as swipe

  constructor(private https: HttpClient) {

  }
  ngOnInit(): void {

  }
  onPointerDown(event: PointerEvent): void {
    this.pointerId = event.pointerId;
    (event.target as HTMLElement).setPointerCapture(this.pointerId);

    this.isDragging = true;
    this.startX = event.clientX;
    this.isAnimatingOut = false;
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.isDragging) return;
    this.currentX = event.clientX - this.startX;
  }

  onPointerUp(event: PointerEvent): void {
    this.isDragging = false;

     (event.target as HTMLElement).releasePointerCapture(this.pointerId);
    if (Math.abs(this.currentX) > this.threshold && this._id) {
      const direction = this.currentX > 0 ? 'interested' : 'ignore';
      this.animateCardOut(direction);
    } else {
      this.currentX = 0;
    }
  }

  animateCardOut(direction: string): void {
    this.isAnimatingOut = true;
    const offscreenX = direction === 'interested' ? window.innerWidth : -window.innerWidth;
    this.currentX = offscreenX;

    setTimeout(() => {
      this.actionOnCard(direction);
    }, 300);
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
