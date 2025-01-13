import { Component, inject, OnInit } from '@angular/core';
import { Schedule, Shifting } from '../parttimer.model';
import { ParttimerserviceService } from '../parttimerservice.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit {
  workShifts: Shifting[] = [];
  workSchedule: Schedule[] = [];
  days: {date:string; day:string; shifts:string[]}[] = [];

  startOfWeek: Date = this.getStartOfWeek(new Date());

  private parttimerService = inject(ParttimerserviceService)

  ngOnInit(): void {
   this._getWorkShift();
  this._getSchedule();
  }

  private _getSchedule(){
    this.parttimerService.getPartTimeSchedule().subscribe({
      next: (res)=> {
        this.workSchedule = res.response;
        console.log(this.workSchedule)
        this._initializeDays(this.startOfWeek)
      },
      error: (err) => {
        console.log(err.message);
      }
    })
  }

  private _initializeDays(startDate : Date){
    // const today = new Date();
    // const startOfWeek = new Date(today);
    // startOfWeek.setDate(today.getDate() - today.getDay() + 1);

    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    this.days = []; // Reset array days

    for (let i = 0; i < 6; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      const dayName = dayNames[currentDate.getDay() - 1];
      const formattedDate = currentDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      const workData = this.workSchedule.find(d =>
        new Date(d.workDate).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }) === formattedDate
      );

      const shifts = this.workShifts.map((_, shiftIndex) => {
        const employee = workData?.partTimeEmployees.find(e => e.shift === shiftIndex + 1);
        return employee ? employee.partTimeName : '';
      });

      this.days.push({
        day: dayName,
        date: formattedDate,
        shifts: shifts
      });
    }
  }

  private _getWorkShift(){
    this.parttimerService.getWorkShift().subscribe({
      next: (response) => {
        this.workShifts = response.response
      },
      error: (err) => {
        console.log(err.message);
      }
    })
  }

  private getStartOfWeek(date: Date): Date {
    const day = date.getDay(); // 0 (Minggu) hingga 6 (Sabtu)
    const diff = day === 0 ? -6 : 1 - day; // Jika Minggu, mundur 6 hari; jika tidak, ke Senin
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() + diff);
    startOfWeek.setHours(0, 0, 0, 0); // Reset waktu ke 00:00:00
    return startOfWeek;
  }

  changeWeek(){
    console.log("Hallo");
    this.startOfWeek.setDate(this.startOfWeek.getDate() + 7);
    this._initializeDays(this.startOfWeek);
  }

  previousWeek(){
    this.startOfWeek.setDate(this.startOfWeek.getDate() - 7);
    this._initializeDays(this.startOfWeek);
  }
}
