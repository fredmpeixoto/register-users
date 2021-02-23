import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../shared/services/user.service';
import { User } from './../../shared/interfaces/user.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  user: User;
  constructor(
    private _snackBar:MatSnackBar,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    this.user = {};
    let userId = this.activatedRoute.snapshot.params.id;
    if (userId) this.getById(userId);
  }

  ngOnInit(): void {}

  save() {
    let _request = this.user.id
      ? this.userService.update(this.user)
      : this.userService.create(this.user);

    _request.subscribe(() => this.openSnackBar("Saved","Close"), error => this.showError());
  }
  showError(): void {
    this.openSnackBar("Somethings is wrong","Close");
  }

  getById(userId: string) {
    this.userService.getById(userId).subscribe((user) => (this.user = user));
  }

  disabledForm(): boolean {
    return !this.user.password || !this.user.email;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
