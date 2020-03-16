import { Component, ViewChild,OnInit, ɵConsole } from "@angular/core";
import { Validators } from "@angular/forms";
import { FieldConfig } from "../../../field.interface";
import { DynamicFormComponent } from "../../../components/dynamic-form/dynamic-form.component";
import { Usuario } from "../../../models/Usuario.model";
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild(DynamicFormComponent,{static: true}) form: DynamicFormComponent;
    regConfig: FieldConfig[] = [
      {
        type: "input",
        label: "Nombre",
        inputType: "text",
        name: "name",
        validations: [
          {
            name: "required",
            validator: Validators.required,
            message: "Nombre es requerido"
          },
          {
            name: "pattern",
            validator: Validators.pattern("^[a-zA-Z]+$"),
            message: "Solo texto."
          }
        ]
      },
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
        type: "radiobutton",
        label: "Genero",
        name: "genero",
        options: ["Hombre", "Mujer"],
        value: "Hombre"
      },
      {
        type: "date",
        label: "Fecha Nacimiento",
        name: "fechaNacimiento",
        validations: [
          {
            name: "required",
            validator: Validators.required,
            message: "La fecha de nacimiento es requerida"
          }
        ]
      },
      {
        type: "select",
        label: "Pais de nacimiento ",
        name: "paisNacimiento",
        value: "Colombia",
        options: ["Colombia", "Argentina", "Chile", "Peru","Ecuador","Paraguai","Venezuela","Brasil"],
        validations: [
          {
            name: "required",
            validator: Validators.required,
            message: "Pais de nacimiento requerido"
          }
        ]
      },
      {
        type: "checkbox",
        label: "Acepta los terminos y condiciones",
        name: "term",
        value: false
      },
      {
        type: "button",
        label: "Guardar",
        color: "primary"
      }
    ];
  constructor( public _usuarioServices: UsuarioService,
    public router:Router ){}

  submit(value: any) {
    if ( value.invalid ) {
      return;
    }
    console.log(value);
    const usuario = new Usuario( 
      value.name,value.email, value.password,value.genero,value.fechaNacimiento ,value.paisNacimiento);
    this._usuarioServices.saveUser( usuario )
      .subscribe(resp => this.router.navigate(['/login']));

  }
}

