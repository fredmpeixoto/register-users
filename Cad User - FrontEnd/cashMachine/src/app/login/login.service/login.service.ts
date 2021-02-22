import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/users/user.interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urlApi: string;
  constructor(private http: HttpClient) {
    this.urlApi = environment.api + "login/"
  }

  login(user: User) {
   return this.http.post(this.urlApi, user);
  }

}
