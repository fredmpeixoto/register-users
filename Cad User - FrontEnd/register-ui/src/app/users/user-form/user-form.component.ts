import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../user.interfaces/user.interface';
import { UserService } from '../user.services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/commons/toast.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AccountService } from 'src/app/commons/account.service/account.service';
import { Account } from 'src/app/commons/account.service/account.interface';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  public user: User;
  idUser: string;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private _accountService: AccountService,
    private _bottomSheet: MatBottomSheet) {

    this.user = {
      cpf: "",
      email: "",
      password: "",
      name: ""
    }

    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.idUser = params['id'];
      if (id)
        this.getById(id);
    });
  }

  ngOnInit() { }

  saveUser(user: User) {
    this.userService.saveUser(user)
      .subscribe(data => {
        data;
        this.toastService.openSnackBar("Salvo!");
        this.router.navigate(['/users']);
      }, error => {
        this.toastService.openSnackBar(error.error);
      })
  }

  private getById(id: string) {
    this.userService.getUserById(id)
      .subscribe(data => {
        this.user = data;
      }, error => {
        console.warn(error);
      })
  }

  openBottomSheet(): void {
    this._accountService.getUserById(this.user.id)
      .subscribe(data => {
        this._bottomSheet.open(BottomSheetOverviewBalance, { data: this.idUser });
      }, error => {
        if (error.status == 401) {
          this.toastService.openSnackBar("Não autorizado! Faça o login!");
          this.router.navigate(['/login']);
        }
      })
  }
}

@Component({
  selector: 'bottom-sheet-balance',
  templateUrl: 'bottom-sheet-balance.html',
  styleUrls: ['./user-form.component.css']
})
export class BottomSheetOverviewBalance {
  value: number;
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewBalance>,
    private _accountService: AccountService,
    private toastService: ToastService) { }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  updateBalance(value: number) {
    debugger
    var user: Account = {
      balance: value,
      userId: this.data
    }
    this._accountService.saveBalance(user)
      .subscribe(data => {
        this.toastService.openSnackBar("Salvo!");
      }, error => {
        this.toastService.openSnackBar(error.statusText);
      })
  }
}
