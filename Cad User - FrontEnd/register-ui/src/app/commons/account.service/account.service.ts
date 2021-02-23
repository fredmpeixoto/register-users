import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from './account.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  urlApi: string;
  constructor(private http: HttpClient) {
    this.urlApi = environment.api + "account/"
  }

  getRemoval(idUser: string, value: number): Observable<any> {
    return this.http.get(`${this.urlApi} ${idUser} /  ${value}`);
  }

  getUserById(idUser: string): Observable<any> {
    return this.http.get(this.urlApi + idUser);
  }

  saveBalance(account: Account): Observable<any> {
    return this.http.post(this.urlApi, account);
  }




}
