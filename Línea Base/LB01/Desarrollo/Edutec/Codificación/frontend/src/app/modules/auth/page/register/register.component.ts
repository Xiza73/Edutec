import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/data/types/user';

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
    private router: Router,
    private toastr: ToastrService
  ) { }
  
  ngOnInit(): void {
  }

  signup(): void {
    const user: User = this.form.value;

    this.authService.singup(user).subscribe(
      response => {
        if (response.statusCode) {
          this.toastr.success('Inicie sesión', 'Registro exitoso');
        }
        this.router.navigate(['/login']);
      },
      err => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

}
