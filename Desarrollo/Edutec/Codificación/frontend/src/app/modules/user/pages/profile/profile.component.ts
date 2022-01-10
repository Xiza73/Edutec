import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/core/services/token.service';
import { ClientService } from 'src/app/data/services/client.service';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/core/services/data-sharing.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public isLogged: boolean = false;
  public username: string = '';
  public aboutMe: string = '';
  public id: string | null = '';
  public form = new FormGroup({
    email: new FormControl({ disabled: true }, [
      Validators.required,
      Validators.email,
      Validators.maxLength(50),
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    aboutMe: new FormControl('', [
      Validators.maxLength(240)
    ]),
  });

  constructor(
    private tokenService: TokenService,
    private toastr: ToastrService,
    private _clientService: ClientService,
    private dataSharingService: DataSharingService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  public getData(): void {
    this.id = this.tokenService.getIdFromToken();
    if (!this.id) {
      this.toastr.error('Error al encontrar usuario', 'Error');
      return;
    }
    this._clientService.getUserProfile(this.id).subscribe(
      (res) => {
        const { email, username, aboutMe } = res.body.data;
        if (aboutMe) {
          this.form.setValue({ email, username, aboutMe });
        } else {
          this.form.setValue({ email, username, aboutMe: ""});
        }
        
        this.username = username;
        this.aboutMe = aboutMe;
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

  public saveData() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const body = {
      username: this.form.value.username,
      aboutMe: this.form.value.aboutMe,
      prevUsername: this.username
    };

    if (this.username === body.username && this.aboutMe === body.aboutMe) {
      this.toastr.info('No hay datos que actualizar', 'Perfil')
      return;
    }

    this._clientService.updateUserProfile(body).subscribe(
      (res) => {
        this.toastr.success(res.message, 'Éxito');
        this.dataSharingService.username.next(body.username);
        this.getData();
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

  isRequiredField(field: string): boolean {
    const formControl = this.form.get(field);
    return formControl?.errors?.required && formControl?.touched;
  }

  isMaxLengthExceeded(field: string): boolean {
    const formControl = this.form.get(field);
    return formControl?.errors?.maxlength && formControl?.touched; 
  }

  isMinLengthInvalid(field: string): boolean {
    const formControl = this.form.get(field);
    return formControl?.errors?.minlength && formControl?.touched;
  }
}
