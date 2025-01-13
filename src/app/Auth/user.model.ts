export interface responseLogin{
  email:string,
  role:string,
  token:string
}

export interface loginRequest{
  email:string,
  password:string,
  role:number
}
