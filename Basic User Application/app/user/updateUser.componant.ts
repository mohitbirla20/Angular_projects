 import { Component } from "@angular/core";
 import { Router } from "@angular/router";
 import { ValidationService } from "../validation.service";
 import { User } from "../model/user";
 import { WebService } from "../web.service";


 @Component({
    selector : 'update',
    templateUrl : 'update.html',
    template : '<update></update>'
 })

 export class UpdateUserComponant{
    title  = 'update';

    public user: User = new User();

    constructor(public webService: WebService,public validation : ValidationService){

    }

    validateDetails(){
      if (this.validation.validate('registration')) {

         this.webService.putAPI("/sphinx/user/update", this.user, 'run-process-btn').subscribe(res => {
         }, resError => {
         });
     }
    }

 } 