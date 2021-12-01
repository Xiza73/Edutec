import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  faEnvelope = faEnvelope;

  form: FormGroup = this.fb.group({
    email   : ['', [ Validators.required, Validators.email, Validators.maxLength(50) ]],
  });
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }
  isValidEmail(): boolean {
    const formControl = this.form.get('email');
    return formControl?.errors?.email && formControl?.touched; 
  }

}
