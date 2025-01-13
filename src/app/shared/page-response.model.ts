export interface ResponseApi<T>{
  status: number;
  message: string;
  response: T
}

export interface PaginationModel{
  pageNumber: number;
  pageSize: number;
  totalRows: number;
  totalPages: number;
}
