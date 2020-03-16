import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "../components/login/login.component";
import { HomeComponent } from "../components/pages/home/home.component";
import { LoginGuard } from "../login.guard";
import { RegisterComponent } from "../components/pages/register/register.component";
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ LoginGuard ],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
     ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  {
    path: '**',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }