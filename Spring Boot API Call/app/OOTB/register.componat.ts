import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ValidationService } from "../validation.service";

@Component({
    selector : 'register',
    templateUrl : './register.html',
    template : '<register></register>'
})

export class RegisterComponat{
   title = 'register';

   constructor(public router : Router,public validation : ValidationService){

   }

   onLogin(){
    this.router.navigate(["/login"])
   }
}