import { PaginationModel } from "../../shared/page-response.model";

export interface PartimerScheduleReview {
  scheduleId: number;
  partTimeId: number;
  partTimeName: string;
  purposeDate: string;
  shift: string;
}

export interface PartimerScheduleReviews{
  scheduleReviews: PartimerScheduleReview[];
  paginations: PaginationModel
}

export interface EmployeeDetail{
  employeeId: number;
  employeeName: string;
}
