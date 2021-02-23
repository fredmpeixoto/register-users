import { UserService } from './../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/interfaces/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users: User[];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.userService.getAll().subscribe((users) => (this.users = users));
  }

  delete(user: User): void {
    this.userService.delete(user)
    .subscribe(success => this.showMessage());
  }

  showMessage(): void {
    throw new Error('Method not implemented.');
  }
}
