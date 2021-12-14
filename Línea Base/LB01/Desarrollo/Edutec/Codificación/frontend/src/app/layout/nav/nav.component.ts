import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  // Icons
  faUser = faUser;

  isLogged: boolean = false;
  username: string = '';

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isValidToken();
    
    if (this.isLogged) {
      this.username = this.tokenService.getUsernameFromToken()!;
    }
  }

  logout(): void {
    this.tokenService.removeToken();
    this.router.navigate(['/login'])
  }

}
