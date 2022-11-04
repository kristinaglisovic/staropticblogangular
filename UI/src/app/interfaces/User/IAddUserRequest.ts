export interface IAddUserRequest{
    FirstName:string,
    LastName:string,
    Username:string,
    Email:string,
    Password:string,
    RoleId:number,
    Image?:string
}