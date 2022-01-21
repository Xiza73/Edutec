import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent implements OnInit {
  faLock = faLock;
  public id: string = '';
  public isUser: boolean = false;

  form: FormGroup = this.fb.group({
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.comprobarId();
  }

  comprobarId() {
    this.route.queryParams.subscribe((params) => {
      if (!params.id) this.toastr.error('Usuario no encontrado', `Error`);
      this.id = params.id;
      this.authService.isUser(params.id).subscribe(
        (res) => {
          this.toastr.success(res.message, `OK: ${res.statusCode}`);
          this.isUser = true;
        },
        (err) => {
          this.toastr.error(
            err.error.message,
            `Error: ${err.error.statusCode}`
          );
        }
      );
    });
  }

  resetPassword() {
    this.authService.resetPassword(this.id, this.form.value.password).subscribe(
      (res) => {
        this.toastr.success(res.message, `OK: ${res.statusCode}`);
      },
      (err) => {
        this.toastr.error(err.error.message, `Error: ${err.error.statusCode}`);
      }
    );
  }

  isRequiredField(field: string): boolean {
    const formControl = this.form.get(field);
    return formControl?.errors?.required && formControl?.touched;
  }
}
