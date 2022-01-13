import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.scss']
})
export class CreateEditUserComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  role = new FormControl('',[Validators.required]);
  password=new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(20) ])
  username=new FormControl('', [ Validators.required, Validators.maxLength(50), Validators.pattern("[A-Za-z0-9]+")])
  name= new FormControl('', [ Validators.required,Validators.pattern("[A-Za-z]+")])

  options: string[] = ['Usuario', 'Administrador', 'Otro'];
  hide = true;
  isChecked = true;
  estado:string='';

  constructor() { }

  ngOnInit(): void {
  }

  emailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debe ingresar el correo';
    }
    return this.email.hasError('email') ? 'No es un email válido' : '';
  }

  pswdErrorMessage(){
      if(this.password.hasError('required')){
        return 'Escriba una contraseña';
      }

     return this.password.hasError('password') ? '':'Escriba minimo 3 caracteres';
    }

   rolErrorMessage(){
    if(this.role.hasError('required')){
      return 'Porfavor escoga un rol';
    }
    return this.role;
   } 

   nameErrorMessage(){
    if(this.name.hasError('required')){
      return 'El nombre es requerido';
    }
    return this.name.hasError('name') ? '' : 'No es un nombre válido';
   } 

   usernameErrorMessage(){
    if(this.username.hasError('required')){
      return 'El nombre de usuario es requerido';
    }
    return this.username.hasError('username') ? '' : 'No es válido';
   }
  isEnabled(){
    if(this.isChecked){
      this.estado="Habilitado";
    }
    else{
      this.estado="Deshabilitado";
    }
    return this.estado;
  }

}
