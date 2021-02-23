import { LoginService } from './../shared/services/login.service';
import { UserService } from './../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/interfaces/user.interface';
import { AuthLogin } from '../shared/interfaces/auth-login.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public user: User;

  constructor(private route: Router, private loginService: LoginService) {
    this.user = {};
  }

  enter(): void {
    this.loginService
      .enter(this.user)
      .subscribe((success) => this.redirect(success));
  }

  redirect(success: AuthLogin) {
    if (success.authenticated) {
      localStorage.setItem('token', JSON.stringify(success));
      this.route.navigateByUrl('/users');
    }
  }
}
