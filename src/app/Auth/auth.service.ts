import { Injectable } from '@angular/core';
import { environtment } from '../app.config';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { loginRequest, responseLogin } from './user.model';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { log } from 'console';
import { ResponseApi } from '../shared/page-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _urlapi = environtment.urlapi;
  private loginUserSubject = new BehaviorSubject<responseLogin | null>(null);
  currentLoginUser$ = this.loginUserSubject.asObservable();
  isLoginS$ = this.currentLoginUser$.pipe(map(user => user !==null));
  constructor(private http : HttpClient, private jwtService : JwtService) { }

  login(credentials : loginRequest):Observable<ResponseApi<responseLogin>>{
    return this.http.post<ResponseApi<responseLogin>>(`${this._urlapi}login`, credentials).pipe(
      tap((user) => {
        console.log(user);
        console.log(user);
        this.setAuth(user.response);
      })
    )
  }

  logOut():void{
    this.purgeAuth();
  }

  setAuth(user: responseLogin){
    if(!user) return;
    this.loginUserSubject.next(user);
    this.jwtService.settToken(user.token);
  }

  purgeAuth(){
    this.jwtService.removeToken();
    this.loginUserSubject.next(null);
  }

  getCurrentUser():Observable<ResponseApi<responseLogin>>{
    return this.http.get<ResponseApi<responseLogin>>(`${this._urlapi}currentuser`)
    .pipe(tap({
      next: (user) => {
        this.setAuth(user.response);
      },
      error: () => this.purgeAuth()
    }));
  }
}
