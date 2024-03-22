import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { AuthLogin } from '../interfaces/auth-login.interface';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private readonly endpoint = `${environment.api}/login`;

  constructor(private httpClient: HttpClient) {}

  enter(user: User): Observable<AuthLogin> {
    return this.httpClient.post(this.endpoint, user);
  }
}
