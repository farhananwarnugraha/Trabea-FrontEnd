import { inject, Injectable } from '@angular/core';
import { environtment } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseApi } from '../../shared/page-response.model';
import { Schedule, Shifting, WorkScheduleForm } from './parttimer.model';
import { Observable } from 'rxjs';
import { Parttimeemployee } from '../administrator/part-time-employees/part-time.model';


@Injectable({
  providedIn: 'root'
})
export class ParttimerserviceService {
  private _urlApi = `${environtment.urlapi}`
  private _http = inject(HttpClient);

  getWorkShift():Observable<ResponseApi<Shifting[]>>{
    return this._http.get<ResponseApi<Shifting[]>>(`${this._urlApi}shift`)
  }

  getPartTimeSchedule():Observable<ResponseApi<Schedule[]>>{
    return this._http.get<ResponseApi<Schedule[]>>(`${this._urlApi}workSchedules`);
  }

  getPartTimeEmployee(email?: string):Observable<ResponseApi<Parttimeemployee>>{
    return this._http.get<ResponseApi<Parttimeemployee>>(`${this._urlApi}parttimeemployeebyemail/${email}`);
  }

  addRequestPartTimeSchedule(scheduleRequest: WorkScheduleForm):Observable<ResponseApi<string>>{
    return this._http.post<ResponseApi<string>>(`${this._urlApi}addWorkSchedule`, scheduleRequest);
  }
}
