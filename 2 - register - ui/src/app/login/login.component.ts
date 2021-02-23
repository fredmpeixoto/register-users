import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from './../shared/services/login.service';
import { UserService } from './../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/interfaces/user.interface';
import { AuthLogin } from '../shared/interfaces/auth-login.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public user: User;

  constructor(
    private route: Router,
    private _snackBar: MatSnackBar,
    private loginService: LoginService
  ) {
    this.user = {};
  }

  enter(): void {
    this.loginService.enter(this.user).subscribe(
      (success) => this.redirect(success),
      (error) => this.openSnackBar('Something is wrong, try again!', 'Close')
    );
  }

  redirect(success: AuthLogin) {
    if (success.authenticated) {
      this.openSnackBar('Wellcome', 'Close');
      localStorage.setItem('token', JSON.stringify(success));
      this.route.navigateByUrl('/users');
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  disabledForm(): boolean {
    return !this.user.email || !this.user.password;
  }
}
