import { Component, OnInit } from '@angular/core';
import { WebService } from 'src/app/web.service';
import { Router } from '@angular/router';


@Component({
    selector: 'userlist',
    templateUrl: './userlist.html'
})
 
export class UserCompnant implements OnInit {
    public list: any[] = []
    
    constructor(public webService: WebService, public router: Router) {
    }
    
    ngOnInit() {
        this.getUserList();
    }

    getUserList() {
        this.webService.getAPI("sphinx/user/allUsers").subscribe((res: any) => {
        this.list = res
        }, resError => {
      });
    }
    
}
