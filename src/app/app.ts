import { Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { ApiService } from './services/api';
import { BASE_URL } from './utils/constants';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = 'DevTinder-Web';

  constructor(private apiService: ApiService) {

  }
  ngOnInit(): void {
    if(!this.apiService.isLoggedIn()){
      this.apiService.restoreUser().subscribe();
    }
  }

}
