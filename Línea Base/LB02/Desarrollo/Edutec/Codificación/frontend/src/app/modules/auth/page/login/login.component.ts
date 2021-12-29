import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';
import { User } from 'src/app/data/types/user';

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
    email   : ['', [ Validators.required, Validators.email, Validators.maxLength(50) ]],
    password: ['', [ Validators.required ]]
  });

  errors: any;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

  }

  login(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const user: User = this.form.value;

    this.authService.login(user).subscribe(
      response => {
        this.tokenService.removeToken();
        this.tokenService.setToken(response.token);
        this.router.navigate(['/']);
      },
      err => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

  isRequiredField(field: string): boolean {
    const formControl = this.form.get(field);
    return formControl?.errors?.required && formControl?.touched;
  }

  isValidEmail(): boolean {
    const formControl = this.form.get('email');
    return formControl?.errors?.email && formControl?.touched; 
  }

  isMaxLengthExceeded(field: string): boolean {
    const formControl = this.form.get(field);
    return formControl?.errors?.maxlength && formControl?.touched; 
  }


}
