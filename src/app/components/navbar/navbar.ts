import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, 
    TitleCasePipe,
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  userData : any;
  showDropdown: boolean = false;
  private router= inject(Router);
  profileDropdown = [
    {name : "Profile", badge : "New", routeLink : "/profile"},
    {name : "Settings" },
    {name : "Logout"}
  ]
  constructor(private apiService: ApiService){  }

  ngOnInit(): void {
    this.apiService.user$.subscribe((res) => {
        this.userData = res;
    })
  }

  toggleDropdown(event: any){
    this.showDropdown = !this.showDropdown;
  }

  dropdownItemClicked(item:any){
    (document.activeElement as HTMLElement)?.blur();
    console.log(item);
    if(item.routeLink){
      this.router.navigate([item.routeLink]);
    }
  }



}
