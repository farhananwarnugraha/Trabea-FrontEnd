import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environtment } from '../../app.config';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../shared/page-response.model';
import { Parttimeemployees } from './partimeemployee.model';

@Injectable({
  providedIn: 'root'
})
export class PartimeserviceService {
  private _http = inject(HttpClient)
  private _urlApi = `${environtment.urlapi}/parttimeemployees`

  getAllPartTimeEmployee(pageNumber: number, name: string):Observable<ResponseApi<Parttimeemployees>>{
    return this._http.get<ResponseApi<Parttimeemployees>>(this._urlApi,{
      params: {
        pageNumber,
        name
      }
    })
  }
}
