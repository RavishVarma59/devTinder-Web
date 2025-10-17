import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dropdown',
  imports: [CommonModule],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css'
})
export class Dropdown implements OnInit {

  @Output()
  whenSelected= new EventEmitter<any>;

  @Input()
  dropdownValues: any;

  constructor(){

  }
  ngOnInit(): void {

  }

    onSelectChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    console.log(value)
    this.whenSelected.emit(value); 
  }

}
