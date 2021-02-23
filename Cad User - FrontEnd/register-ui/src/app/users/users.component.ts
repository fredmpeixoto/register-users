import { UserService } from './../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/interfaces/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

  public users: User[];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.userService.getAll().subscribe(users => this.users = users);
  }
}
