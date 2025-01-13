import { inject, Injectable } from '@angular/core';
import { environtment } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { Params, Router } from '@angular/router';
import { ResponseApi } from '../../shared/page-response.model';
import { EmployeeDetail, PartimerScheduleReview, PartimerScheduleReviews } from './managerial-model.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerialServiceService {
  private _baseUrl = `${environtment.urlapi}`;
  private _http = inject(HttpClient);
  private _router = inject(Router);

  getScheduleReview(params: Params): Observable<ResponseApi<PartimerScheduleReviews>> {
    const activedParams = Object.keys(params).filter((key) => params[key] !== null).reduce<Params>((activedParams, paramsName) =>{
      activedParams[paramsName] = params[paramsName];
      return activedParams;
    }, {});

    return this._http.get<ResponseApi<PartimerScheduleReviews>>(`${this._baseUrl}workScheduleReview`, {params: activedParams});
  }

  approvedSchedule(scheduleId: number, managerId: number):Observable<ResponseApi<string>>{
    return this._http.put<ResponseApi<string>>(`${this._baseUrl}approvedSchedule/${scheduleId}`, {managerId}).pipe(
      catchError((error) => {
        return throwError(() => error);
    }))
  }

  rejectedSchedule(scheduleId: number, managerId: number):Observable<ResponseApi<string>>{
    return this._http.put<ResponseApi<string>>(`${this._baseUrl}rejectedSchedule/${scheduleId}`, {managerId}).pipe(
      catchError((error) => {
        return throwError(() => error);
    }))
  }

  getManagerId(email:string):Observable<ResponseApi<EmployeeDetail>>{
    return this._http.get<ResponseApi<EmployeeDetail>>(`${this._baseUrl}employee/${email}`);
  }
}
