import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponant } from './home.componant';
import { MainComponent } from './main.componant';
import { LoginComponent } from './OOTB/login.componat';
import { SignupComponent } from './OOTB/signup.componat';
import { RegisterComponat } from './OOTB/register.componat';
import { UserListComponent } from './user/userlist.componant';

const routes: Routes = [
  {
    path : 'home',
    component : HomeComponant,
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'singup',
    component : SignupComponent
  },
  {
    path : 'register',
    component : RegisterComponat
  },
  {
    path : 'userlist',
    component : UserListComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
