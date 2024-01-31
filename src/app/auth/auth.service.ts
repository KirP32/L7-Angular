import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Login, Users, UsersNew } from '../interfaces/users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }
  private _accessToken = '';
  private _users: UsersNew[] = [
  ];
  public _username: string = "";
  private _authorized: boolean = false;
  public counter = 0;
  
  public addUser(item: UsersNew): Observable<any> {
    this.counter++;
    let user: UsersNew = {
      name: item.name,
      //_sename: item._sename,
      password: item.password,
      email: item.email,
      //birthday: item.birthday
    };
    this._users.push(user);
    return of();
  }

  public get authtoken(): string {
    return this._accessToken;
  }
  public register(item: UsersNew): Observable<any> {
    this.addUser(item);
    let headers = new HttpHeaders({ ['Content-Type']: 'application/json' });

    return this.httpClient.post(environment.apiUrl + 'auth/register', JSON.stringify(item), {
      headers: headers
    });
  }

  // public login(item: Login): Observable<any> {
  //   let headers = new HttpHeaders({
  //     ['accept']: 'application/json',
  //     ['Content-Type']: 'application/json'
  //   });
  //   this._authorized = true;
  //   return this.httpClient.post(environment.apiUrl + 'auth/login', JSON.stringify(item), {
  //     headers: headers
  //   });
  // }


  public login(item: Login): Observable<any> {
    let headers = new HttpHeaders({
      ['Content-Type']: 'application/json',
      ['accept']: 'application/json',
    });

    return this.httpClient.post<any>(environment.apiUrl + 'auth/login', JSON.stringify(item), {
      headers: headers
    })
      .pipe(
        tap({
          next: result => {
            this._accessToken = result.accessToken;
            this.parseUser();
          }, error: _ => {
            this._accessToken = "";
          }
        })
      );
  }
  private parseUser() {
    let payload = this._accessToken.split(".")[1];
    let data = JSON.parse(atob(payload));
    this._username = `${data.name}`;
  }


  public logout() {
    this._accessToken = "";
  }
  public isAuthorized() {
    return this._accessToken != "";
  }
  public findUser(mail: string, pass: string) {
    for (let index = 0; index < this.counter; index++) {
      if (this._users[index].email == mail && this._users[index].password == pass) return true;
    }
    return false;
  }
}
