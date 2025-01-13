import { PaginationModel } from "../../shared/page-response.model";

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
