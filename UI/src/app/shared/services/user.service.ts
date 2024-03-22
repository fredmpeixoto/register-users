import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly endpoint = `${environment.api}/user`;

  constructor(private httpClient: HttpClient) {}

  create(user: User): Observable<User> {
    return this.httpClient.post(this.endpoint, user);
  }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.endpoint);
  }

  getById(userId: string): Observable<User> {
    return this.httpClient.get(`${this.endpoint}/${userId}`);
  }

  update(user: User): Observable<User> {
    return this.httpClient.put(`${this.endpoint}/${user.id}`, user);
  }

  delete(user: User): Observable<User> {
    return this.httpClient.delete(`${this.endpoint}/${user.id}`);
  }
}
