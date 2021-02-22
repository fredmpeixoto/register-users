import { Component, OnInit } from '@angular/core';
import { User } from '../users/user.interfaces/user.interface';
import { LoginService } from './login.service/login.service';
import { ToastService } from '../commons/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User;

  constructor(
    private loginService: LoginService,
    private toastService: ToastService,
    private router: Router) {
    this.user = {
      email: "",
      password: ""
    }
  }

  ngOnInit() { }

  login(user: User) {
    this.loginService.login(user)
      .subscribe((data: any) => {
        localStorage.setItem("token", JSON.stringify( data));
        this.toastService.openSnackBar("Login efetuado com sucesso!");
        this.router.navigate(['/users']);

      }, error => {
        this.toastService.openSnackBar("Login erro!");
      })
  }
}
