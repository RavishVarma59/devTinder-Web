import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  userData : any;
  constructor(private apiService: ApiService){  }
  
  ngOnInit(): void {
    this.apiService.userData.subscribe((res) => {
        this.userData = res.user;
    })
  }



}
