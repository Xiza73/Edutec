import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ClientService } from 'src/app/core/services/client.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public isLogged: boolean = false;
  public username: string = '';
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
    aboutMe: new FormControl('', [Validators.required]),
  });

  constructor(
    private tokenService: TokenService,
    private toastr: ToastrService,
    private _clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  public getData(): void {
    this.isLogged = this.tokenService.isValidToken();
    if (!this.isLogged) {
      this.toastr.error('No se encuentra loggeado', 'Error');
      return;
    }
    if(!this.username){
      this.username = localStorage.getItem('username')!
      if(!this.username){
        this.username = this.tokenService.getUsernameFromToken()!;
        if (!this.username) {
          this.toastr.error('Error al obtener la data', 'Error');
          return;
        }
      }
    }
    this._clientService.getUserProfile(this.username).subscribe(
      (res) => {
        const { email, username, aboutMe } = res.body.data;
        this.form.setValue({ email, username, aboutMe });
        this.username = username.slice()
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
    }
    this._clientService.updateUserProfile(body).subscribe(
      (res) => {
        this.toastr.success(res.message, `OK: ${res.statusCode}`)
        this.username = this.form.value.username
        localStorage.setItem('username', this.username)
        this.getData()
      },
      (err) => {
        this.toastr.error(err.error.message, `Error: ${err.error.statusCode}`);
      }
    )
  }
}
