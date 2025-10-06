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

  protected email : string | undefined = "sunil@gmail.com";
  protected password : string | undefined = "Sunil@123";

  loginError : string = "";

  private router = inject(Router);

  constructor(private apiService : ApiService){

  }
  ngOnInit(): void {
  }

  submitForm(){
    console.log("email : ",this.email);
    console.log("Password : ",this.password);
    const creds = {
      email : this.email,
      password : this.password
    }
    const loginApi = BASE_URL + "/login";

    this.apiService.login(loginApi,creds).subscribe({
      next: (res)=> {
        this.loginError = "";
       }, 
      error: (err)=> {
        console.log("error : ", err.error);
        this.loginError = err?.error;
      }
    }
    );

  }
  


}
