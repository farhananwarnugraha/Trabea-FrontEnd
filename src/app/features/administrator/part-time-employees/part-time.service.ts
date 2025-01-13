import { inject, Injectable } from '@angular/core';
import { environtment } from '../../../app.config';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ResponseApi } from '../../../shared/page-response.model';
import { PartTimeData, PartTimeDetail, Parttimeemployee, Parttimeemployees } from './part-time.model';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PartTimeService {
  private urlApi = `${environtment.urlapi}`
  private _http = inject(HttpClient);

  getAllPartTimeEmployee(params: Params): Observable<ResponseApi<Parttimeemployees>>{
    const activedParams = Object.keys(params).filter((key) => params[key] !== null).reduce<Params>((activedParams, paramName) => {
      activedParams[paramName] = params[paramName];
      return activedParams;
    }, {})

    return this._http.get<ResponseApi<Parttimeemployees>>(`${this.urlApi}parttimeemployees`, {params: activedParams})
  }

  insertPartTimeEmployee(partTimeData: PartTimeData):Observable<Parttimeemployee>{
    return this._http.post<Parttimeemployee>(`${this.urlApi}addParttimeemployee`, partTimeData).pipe(
      catchError((error) => {
        return throwError(() => 'Kelasalahan System ' + `${error.message}`);
      })
    );
  }

  getPartTimeEmployee(partTimeId: number):Observable<ResponseApi<PartTimeData>>{
    return this._http.get<ResponseApi<PartTimeData>>(`${this.urlApi}parttimeemployee/${partTimeId}`);
  }

  updatePartTimeEmployee(partTimeId: number, partTimeData: PartTimeData):Observable<Parttimeemployee>{
    return this._http.put<Parttimeemployee>(`${this.urlApi}parttimeemployee/${partTimeId}`, partTimeData).pipe(
      catchError((error) => {
        return throwError(() => 'Kelasalahan System ' + `${error.message}`);
      })
    );
  }

  getDetailPartTimeEmployee(partTimeId: number):Observable<ResponseApi<PartTimeDetail>>{
    return this._http.get<ResponseApi<PartTimeDetail>>(`${this.urlApi}parttimeemployeedetail/${partTimeId}`)
  }

}
