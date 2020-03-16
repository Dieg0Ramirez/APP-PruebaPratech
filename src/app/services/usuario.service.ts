import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from "../models/Usuario.model";
import { URL_API } from "../config/config";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { TableModule } from "../models/table.module";
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
  }


  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  login(usuario: Usuario) {
    const url = URL_API + '/login';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      }));
  }
  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }
  saveUser(usuario: Usuario) {
    const url = URL_API + '/usuario';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        return true;
      }));
  }
  updateUser(usuario:Usuario){
    let url = URL_API + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url,usuario).pipe(
      map((resp: any)  =>{
        return resp.Usuario;
      })
    )
  }
  getUsers() {
    let url = URL_API + '/usuario';
    url += '?token=' + this.token;
    return this.http.get<TableModule>(url);
  }
  deleteUser(id: any) {
    let url = URL_API + '/usuario/' + id;
    return this.http.delete(url).pipe(
      map((resp: any) => {
        return resp.Usuario;
      })
    )

  }
}
