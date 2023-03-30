import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main.componant';
import { HomeComponant } from './home.componant';
import { LoginComponent } from './OOTB/login.componat';
import { RegisterComponat } from './OOTB/register.componat';
import { UserListComponent } from './user/userlist.componant';
import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';
import { ValidationService } from './validation.service';
import { UpdateUserComponant } from './user/updateUser.componant';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponant,
    LoginComponent,
    RegisterComponat,
    UserListComponent,
    UpdateUserComponant
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [WebService,ValidationService],
  bootstrap: [MainComponent]
})
export class AppModule { }
