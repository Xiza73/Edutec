import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';
import { User } from 'src/app/data/types/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Icons
  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;
  
  // Form
  form: FormGroup = this.fb.group({
    email   : ['', [ Validators.required ]],
    password: ['', [ Validators.required ]]
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    const user: User = this.form.value;

    this.authService.login(user).subscribe(
      response => {
        this.tokenService.removeToken();
        this.tokenService.setToken(response.token);
        this.router.navigate(['/']);
      },
      err => {
        console.log('error', err);
      }
    );
  }

}
