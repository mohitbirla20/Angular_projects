import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../web.service';

@Component({
    selector: 'userlist',
    templateUrl: './userlist.html',
    template : '<userlist></userlist>'
}) 

export class UserListComponent {
    title = 'user';
    public list: any[] = []
    
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
    
} 