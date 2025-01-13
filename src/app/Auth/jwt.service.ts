import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  settToken(token:string){
    localStorage.setItem('token', token);
  }

  getToken():string | null {
    // return window.localStorage.getItem('token');
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('token');
    }
    return null; // Atau fallback lainnya
  }


  isAuthenticated():boolean{
    return !!this.getToken();
  }

  removeToken(){
    localStorage.removeItem('token');
  }
}
