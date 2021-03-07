import { UserService } from './../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public textFilter: string;
  public users: User[];
  public usersOrigin: User[];
  constructor(
    private _snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.userService.getAll().subscribe((users) => this.setUsers(users));
  }

  private setUsers(users: User[]): void {
    this.users = users;
    this.usersOrigin = users;
  }

  delete(user: User): void {
    this.userService.delete(user).subscribe((success) => this.showMessage());
  }

  showMessage(): void {
    this.openSnackBar('Deleted', 'Close');
    this.getAll();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  filter(): void {
    this.users = this.usersOrigin.filter((user) =>
      user.name.split(' ').some((word) => word === this.textFilter)
    );

    if (this.textFilter.length === 0) this.users = this.usersOrigin;
  }
}
