import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  faLock = faLock;

  form: FormGroup = this.fb.group({
    password: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(20) ]]
  });

  constructor(
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
  }


  isRequiredField(field: string): boolean {
    const formControl = this.form.get(field);
    return formControl?.errors?.required && formControl?.touched;
  }

  isMinLengthInvalid(field: string): boolean {
    const formControl = this.form.get(field);
    return formControl?.errors?.minlength && formControl?.touched;
  }
}
