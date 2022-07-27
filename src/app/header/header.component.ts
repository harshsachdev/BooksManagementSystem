import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) { }

  isAuthenticated = false;
  private userSub: Subscription;

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      //console.log(user);
      this.isAuthenticated = !!user;
      // console.log(!user);
      // console.log(!!user);
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if(this.userSub){
      this.userSub.unsubscribe();
    }  
  }

}
