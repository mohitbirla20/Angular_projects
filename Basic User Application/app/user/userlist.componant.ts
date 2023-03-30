import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../web.service';
import { User } from '../model/user';

@Component({
    selector: 'userlist',
    templateUrl: './userlist.html',
    template : '<userlist></userlist>'
}) 
  
export class UserListComponent {
   
    title = 'user';
    public list: any[] = [];
    public user : User = new User();

    constructor(public webService: WebService, public router: Router) {
    }
      
    ngOnInit() { 
        this.getUserList();
    } 

    getUserList() {
        this.webService.getAPI("/sphinx/user/allUsers").subscribe((res: any) => {
        this.list = res
        }, resError => {
      });
    }
    
    deleteUser(id: any){
        this.webService.deleteAPI("/sphinx/user/userid/"+id).subscribe((res: any) => {
             this.getUserList();
            }, resError => {
          });   
     }

    updateUserDetails(id : any){
        this.router.navigate(['/updateUser'])
    }
} 