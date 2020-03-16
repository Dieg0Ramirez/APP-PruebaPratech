import { Component, OnInit,ViewChild,OnDestroy,Input } from '@angular/core';
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { UsuarioService } from "../../../services/usuario.service";
import { Usuario } from "../../../models/Usuario.model";
import { DataTableDirective } from 'angular-datatables';
import { DynamicFormComponent } from "../../../components/dynamic-form/dynamic-form.component";
import { FieldConfig } from "../../../field.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  @ViewChild(DynamicFormComponent,{static: true}) form: DynamicFormComponent;
  regConfig: FieldConfig[] = [];
  userSession = JSON.parse(localStorage.getItem('usuario'));
  displayedColumns: string[] = ['nombre', 'email', 'genero', 'paisNacimiento','fechaNacimiento','button'];
  usuario: Usuario[]=[];
  usuarioUpdate: Usuario[]=[];
  dataSource =new MatTableDataSource(this.usuario);
  options:string[]= ["Colombia", "Argentina", "Chile", "Peru","Ecuador","Paraguai","Venezuela","Brasil"]
  optionsRadioButton:string[] = ["Hombre","Mujer"];
  columns=[
    {titulo:"Nombre",name:"nombre"},
    {titulo:"Email",name:"email"},
    {titulo:"Gemero",name:"genero"},
    {titulo:"Pais Nacimiento",name:"paisNacimiento"},
    {titulo:"Fecha Nacimiento",name:"fechaNacimiento"},
    {titulo:"",name:"id"},
  ]
  @ViewChild(DataTableDirective, {static: false})
  @ViewChild(MatSort,{static:false}) sort :MatSort;

  public temp: Object=false;
  constructor(public _usuarioServices: UsuarioService) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.findUsario();
  }
  findUsario() {
    this._usuarioServices.getUsers().subscribe((res: any) => {
      this.usuario = res.usuarios;
      this.temp = true;
      this.dataSource = new MatTableDataSource(this.usuario);
    })
  }
  deleteUser(value: any){
    if(value.email == this.userSession.email)
    {
      console.log("No puede eliminar el usuario Logueado")
      return;
    }
    let id = value._id;    
    this._usuarioServices.deleteUser(id).subscribe((res:any) => {
      this.findUsario();
    })
  }
  findUserUpdate(value:any){
    this.usuarioUpdate = value;
  }

  ngOnDestroy(){
  }

  updateUser(value: any){
    console.log(value);
    this._usuarioServices.updateUser(value).subscribe((res:any) => {
      this.findUsario();
      this.usuarioUpdate =[];
    });
  }
}

