import { DatepickerViewModel } from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model";

export interface User{
    id:number,
    firstName:string,
    lastName:string,
    email:string,
    image:string,
    postsCount: number,
    createdAt:Date,
    updatedAt:Date,
    role:string
}