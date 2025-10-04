import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  protected email : string | undefined = "sunil@gmail.com";
  protected password : string | undefined = "Sunil@123";

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
    const loginApi = "http://localhost:7777/login";

    this.apiService.postData(loginApi,creds).subscribe((res) => {
      console.log(res);
      this.apiService.userData.next(res);
      this.router.navigate(['/']);
    });

  }
  


}
