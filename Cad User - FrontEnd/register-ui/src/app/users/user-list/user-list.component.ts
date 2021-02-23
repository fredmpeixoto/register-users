import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.services/user.service';
import { User } from '../user.interfaces/user.interface';
import { ToastService } from 'src/app/commons/toast.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public dataUsers: any[]
  constructor(
    private userService: UserService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.getUsers();
  }


  getUsers() {
    this.userService.getUsers()
      .subscribe(data =>
        this.dataUsers = data
        , error => {
          this.toastService.openSnackBar("Error! :"+error);
        })
      }

      remove(user: User) {
        this.userService.removeUser(user)
        .subscribe(data => {
          this.toastService.openSnackBar("Deletado com sucesso!");
          this.getUsers();
        }, error => {
          this.toastService.openSnackBar("Error! :"+ error);

      })
  }

}
