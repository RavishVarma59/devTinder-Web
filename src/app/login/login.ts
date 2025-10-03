import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  email : string | undefined = "sunil@gmail.com";
  password : string | undefined = "Sunil@123";

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
    });

  }
  


}
