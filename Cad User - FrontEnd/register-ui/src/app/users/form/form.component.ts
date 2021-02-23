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
    private activatedRoute: ActivatedRoute,
    private userService: UserService
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

    _request.subscribe((success) => {});
  }

  getById(userId: string) {
    this.userService.getById(userId).subscribe((user) => (this.user = user));
  }
}
