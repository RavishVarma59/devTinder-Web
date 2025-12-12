import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';
import { Router } from '@angular/router';
import { BASE_URL } from '../../utils/constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  isLoggin: boolean = true;

  firstName: string | undefined;
  lastName: string | undefined;

  protected email: string | undefined;
  protected password: string | undefined;

  loginError: string = "";

  private router = inject(Router);

  constructor(private apiService: ApiService) {

  }
  ngOnInit(): void {
  }


  submitForm(): void {
    const creds = {
      "firstName": this.firstName,
      "lastName": this.lastName,
      "email": this.email,
      "password": this.password
    }
    const loginApi = this.isLoggin ? BASE_URL + "/login" :
      BASE_URL + "/signup";

    this.apiService.login(loginApi, creds).subscribe({
      next: (res) => {
        this.loginError = "";
      },
      error: (err) => {
        console.log("error : ", err.error);
        this.loginError = err?.error;
      }
    });
  }

  toggleLogin(event: any) {
    this.loginError = "";
    this.isLoggin = !this.isLoggin;
  }
}
