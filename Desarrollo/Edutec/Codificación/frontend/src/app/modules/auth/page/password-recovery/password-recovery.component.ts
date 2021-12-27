import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss'],
})
export class PasswordRecoveryComponent implements OnInit {
  faEnvelope = faEnvelope;

  form: FormGroup = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(50)],
    ],
  });
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  public sendRecoveryEmail() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email } = this.form.value;
    this.authService.sendRecoverEmail(email).subscribe(
      (res) => {
        this.toastr.success(res.message, `OK: ${res.statusCode}`);
      },
      (err) => {
        this.toastr.error(err.error.message, `Error: ${err.error.statusCode}`);
      }
    );
  }

  isValidEmail(): boolean {
    const formControl = this.form.get('email');
    return formControl?.errors?.email && formControl?.touched;
  }
}
