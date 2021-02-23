import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user.interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlApi: string;
  constructor(private http: HttpClient) {
    this.urlApi = environment.api + "user/"
  }

  getUsers(): Observable<any> {
    return this.http.get(this.urlApi);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(this.urlApi + id);
  }

  saveUser(user: User): Observable<any> {
    if (user.id)
      return this.http.put(this.urlApi + user.id, user);
    else
      return this.http.post(this.urlApi, user);
  }

  removeUser(user: User): Observable<any> {
    return this.http.delete(this.urlApi + user.id)
  }
}
