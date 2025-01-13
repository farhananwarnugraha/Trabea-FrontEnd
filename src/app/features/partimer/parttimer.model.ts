export interface Shifting{
  id: number,
  shiftTime: string
}

export interface Schedule{
  workDate: string,
  partTimeEmployees: PartTimeEmployee[]
}

export interface PartTimeEmployee{
  partTimeId: number,
  partTimeName: string,
  shift: number
}

export interface WorkScheduleForm{
  partTimerId: number,
  shiftId: number,
  workDate: string
}
