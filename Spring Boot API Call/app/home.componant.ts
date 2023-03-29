import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component ({
   selector : 'home',
   templateUrl : './home.html',
   template : '<home></home>'
})

export class HomeComponant{
     title = 'home';
 
     constructor(public router: Router) {

     }   
 
     onLogin() {
         this.router.navigate(['/login'])
     }

     onSignUp(){
        this.router.navigate(['/singup'])
     }

     onRegister(){
      this.router.navigate(['/register'])
     }

     getAllUsers(){
      this.router.navigate(['/userlist'])
     }
}