import { Component, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { UserlistComponent } from '../_shared/userlist.component';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {

  currentUser: User;

  @ViewChild(UserlistComponent, { static: false }) uList: UserlistComponent;

  constructor(private userService: UserService, private authService: AuthenticationService) { }

  userVersion: string = "";
 
  
    ngOnInit() {
        
      this.authService.currentUser.subscribe(user => {
        console.log(user);
        this.currentUser = user;
      })
    }

  ngAfterViewInit() {
    this.userVersion = this.uList.version;
    }

}
