import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card } from '../card/card';
import { Dropdown } from '../dropdown/dropdown';
import { BASE_URL } from '../../utils/constants';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,FormsModule,Card, Dropdown],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  userProfile: any;
  firstName: any;
  lastName: any;
  photoUrl: any;
  age: any;
  gender: any;
  about: any;

  errorMsg : any;
  successAlert:boolean = false;

  genderDropdown: any = [
    { value: "male", selected: false },
    { value: "female", selected: false },
    { value: "other", selected: false }
  ];

  constructor(private apiService: ApiService,
    private https : HttpClient
  ) {

  }

  ngOnInit(): void {
    this.apiService.user$.subscribe((res) => {
      this.userProfile = res;
      this.firstName = res.firstName;
      this.lastName = res.lastName;
      this.photoUrl = res.photoUrl;
      this.age = res.age;

      if (res.gender) {
        this.gender = res.gender;
        this.genderDropdown.forEach((g: any) => g.selected = (g.value === res.gender));
      } else {
        this.genderDropdown.unshift({
          value: "select gender", selected: true, disabled: true
        });
      }
      this.about = res.about;
    })
  }

  whenSelected(item:string){
    this.gender = item;
  }

  submitForm(){
    const saveUrl = BASE_URL+ "/profile/edit";
    this.errorMsg = "";

    this.https.patch(saveUrl,{
      "firstName": this.firstName,
      "lastName" : this.lastName,
      "about": this.about,
      "photoUrl":this.photoUrl,
      "age": this.age,
      "gender":this.gender
    },{withCredentials:true}).subscribe({
      next:(res:any)=>{
        this.apiService.userData.next(res.user);
        this.successAlert = true;
        setTimeout(() => {
          this.successAlert = false;
        }, 3000);
      console.log(res);
    },
    error:(err)=>{
      this.errorMsg = err.error;
      console.error(err);
    }})

  }

}
