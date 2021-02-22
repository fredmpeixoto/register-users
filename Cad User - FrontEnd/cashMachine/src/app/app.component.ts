import { Component } from '@angular/core';
import { BalanceComponent } from './balance/balance.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cashMachine';

  constructor(private _bottomSheet: MatBottomSheet) { }

  logout() {
    localStorage.removeItem("token");
  }

  get showLogin() {
    return JSON.parse(localStorage.getItem("token"));
  }

  get userName() {
    return JSON.parse(localStorage.getItem("token")) ?
      JSON.parse(localStorage.getItem("token")).user.name : null;
  }

  get userId() {
    return JSON.parse(localStorage.getItem("token")) ?
      JSON.parse(localStorage.getItem("token")).user.id : null;
  }

  openBalance() {
    this._bottomSheet.open(BalanceComponent, { data: this.userId });
  }
}
