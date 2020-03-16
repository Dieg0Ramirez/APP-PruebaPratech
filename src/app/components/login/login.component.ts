import { Component, OnInit,ViewChild } from '@angular/core';
import { DynamicFormComponent } from "../../components/dynamic-form/dynamic-form.component";
import { FieldConfig } from "../../field.interface";
import { Validators,NgForm } from "@angular/forms";
import { Usuario } from "../../models/Usuario.model";
import { UsuarioService } from "../../services/usuario.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild(DynamicFormComponent,{static: true}) form: DynamicFormComponent;
  constructor(
    public _usuarioServices:UsuarioService,
    public router:Router
    ){} 
  
  regConfig: FieldConfig[] = [
    {
      type: "input",
      label: "Email",
      inputType: "email",
      name: "email",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Email es requerido"
        },
        {
          name: "pattern",
          validator: Validators.pattern(
            "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
          ),
          message: "Email Incorrecto"
        }
      ]
    },
    {
      type: "input",
      label: "Contraseña",
      inputType: "password",
      name: "password",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "La Contraseña es requerida"
        }
      ]
    },
    {
      type: "button",
      label: "Ingresar",
      color: "primary"
    }
  ];

submit(value: any) {
    console.log(value.password);
    console.log( value.email);

    if ( value.invalid ) {
      return;
    }
    const usuario = new Usuario( null, value.email, value.password);
    this._usuarioServices.login( usuario )
                  .subscribe(resp => this.router.navigate(['/home']));
  }
}
