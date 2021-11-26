import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/data/types/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;
  
  // Form
  form: FormGroup = this.fb.group({
    username: ['', [ Validators.required ]],
    email   : ['', [ Validators.required ]],
    password: ['', [ Validators.required ]]
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }
  
  ngOnInit(): void {
  }

  signup(): void {
    const user: User = this.form.value;

    this.authService.singup(user).subscribe(
      response => {
        console.log('response', response);
        this.router.navigate(['/login']);
      },
      err => {
        console.log('error', err);
      }
    );
  }

}
