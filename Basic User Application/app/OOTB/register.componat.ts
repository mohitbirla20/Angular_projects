import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ValidationService } from "../validation.service";
import { WebService } from "../web.service";
import { User } from "../model/user";


@Component({
    selector: 'register',
    templateUrl: './register.html',
    template: '<register></register>'
})

export class RegisterComponat {
    title = 'register';

    public user: User = new User();

    //    public  userName : string;
    //    public  email : string;
    //    public  address : string;
    //    public  age : number;
    //    public  contactNumber : string;

    constructor(public router: Router, public webService: WebService, public validation: ValidationService) {

    }
 
    //    constructor(private user: User, private webService: WebService,
    //     private route: ActivatedRoute, private router: Router,private city:City,
    //     private _location: Location) { 
    //     this.user.city=this.city;


    onLogin() {
        this.router.navigate(["/login"])
    }


    validateDetails() {
        if (this.validation.validate('registration')) {

            this.webService.postAPI("/sphinx/user/regester", this.user, 'run-process-btn').subscribe(res => {
            }, resError => {
            });
        }
    }
}