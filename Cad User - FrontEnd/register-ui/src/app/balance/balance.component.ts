import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AccountService } from '../commons/account.service/account.service';
import { ToastService } from '../commons/toast.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'bottom-sheet-balance-remove',
  templateUrl: 'balance.component.html',
  styleUrls: ['./balance.component.css']
})

export class BalanceComponent {
  value: number;
  balanceCurrent: number;
  cedulas: [];

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<BalanceComponent>,
    private _accountService: AccountService,
    private router: Router,
    private toastService: ToastService,
    public dialog: MatDialog) {
    this.getCurrentBalance();
    this.cedulas = [];
  }

  closeLink(): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  getCurrentBalance() {
    this._accountService.getUserById(this.data)
      .subscribe(data => {
        this.balanceCurrent = data.balance;
      }, error => {
        debugger
        if (error.status == 401) {
          this.toastService.openSnackBar("Não autorizado! Faça o login!");
          this.router.navigate(['/login']);
          this.closeLink()
        }
      })
  }

  removeBalance(value: number) {
    this.cedulas.length = 0;
    this._accountService.getRemoval(this.data, value)
      .subscribe(data => {
        this.toastService.openSnackBar("Pega suas Cédulas!");
        this.cedulas = data.moneys;
        this.openDialog()
        this.closeLink()
      }, error => {
        this.toastService.openSnackBar(error.statusText);
      })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverview, {
      width: '250px',
      data: { cedulas: this.cedulas }
    });

    dialogRef.afterClosed().subscribe(result => {
      location.reload()
    });
  }
}


@Component({
  selector: 'dialog-overview',
  templateUrl: 'dialog-overview.html',
})
export class DialogOverview {

  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
