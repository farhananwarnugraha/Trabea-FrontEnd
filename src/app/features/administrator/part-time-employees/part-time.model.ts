import { PaginationModel } from "../../../shared/page-response.model";

export interface Parttimeemployee {
  partTimeId: number;
  fullName: string;
  personalEmail: string;
  workEmail: string;
  phoneNumber: string;
  joinDate: string;
}

export interface Parttimeemployees {
  partTimeEmployees: Parttimeemployee[];
  paginations: PaginationModel
}

export interface PartTimeData{
  firstName: string,
  lastName: string,
  personalEmail: string,
  personalPhoneNumber: string,
  workEmail: string,
  address: string,
  lastEducation: string,
  onGoingEducation: string
}

export interface PartTimeDetail{
  fullName: string,
  personalEmail: string,
  workEmail: string,
  personalPhoneNumber: string
}
