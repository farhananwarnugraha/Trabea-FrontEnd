import { Router, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { AdministratorComponent } from './features/administrator/administrator.component';
import { PartTimeEmployeesComponent } from './features/administrator/part-time-employees/part-time-employees.component';
import { PartTimeListEmployeeComponent } from './features/administrator/part-time-employees/part-time-list-employee/part-time-list-employee.component';
import { PartTimeFormComponent } from './features/administrator/part-time-employees/part-time-form/part-time-form.component';
import { inject } from '@angular/core';
import { AuthService } from './Auth/auth.service';
import { map } from 'rxjs';
import { PartimerComponent } from './features/partimer/partimer.component';
import { ScheduleComponent } from './features/partimer/schedule/schedule.component';
import { RequestscheduleComponent } from './features/partimer/requestschedule/requestschedule.component';
import { ManagerialComponent } from './features/managerial/managerial.component';
import { ManagerialScheduleComponent } from './features/managerial/managerial-schedule/managerial-schedule.component';
import { ManagerialScheduleReviewsComponent } from './features/managerial/managerial-schedule-reviews/managerial-schedule-reviews.component';
import { ModalPopupComponent } from './shared/components/modal-popup/modal-popup.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    redirectTo: '',
    canActivate: [
      () => {
        const router = inject(Router);
        return inject(AuthService).isLoginS$.pipe(
          map((isLoggedIn) => {
            if(isLoggedIn){
              alert('You are logged in')
              router.navigate(['/part-time-employees'])
            }
            return true;
          })
        )
      }
    ]
  },
  {
    path: 'part-time-employees',
    component: AdministratorComponent,
    children: [
      {
        path: '',
        component: PartTimeEmployeesComponent,
        children:[
          {
            path: '',
            component: PartTimeListEmployeeComponent
          },
          {
            path:'parttimer',
            redirectTo: '',
          },
          {
            path: 'add-new-part-time',
            component: PartTimeFormComponent
          },
          {
            path: 'edit/:partTimeId',
            component: PartTimeFormComponent
          }
        ]
      },
    ]
  },
  {
    path: 'workSchedule',
    component: PartimerComponent,
    children: [
      {
        path: '',
        component: ScheduleComponent
      },
      {
        path: 'request-schedule',
        component: RequestscheduleComponent
      },
      {
        path: 'schedule',
        redirectTo: '',
      },
    ]
  },
  {
    path: 'managerial',
    component: ManagerialComponent,
    children: [
      {
        path: '',
        component: ManagerialScheduleComponent
      },
      {
        path: 'managerial-schedule',
        redirectTo: ''
      },
      {
        path: 'schedule-review',
        component: ManagerialScheduleReviewsComponent
      },
      {
        path: 'detail/:partTimeId',
        component: ModalPopupComponent
      }
    ]
  }
];
