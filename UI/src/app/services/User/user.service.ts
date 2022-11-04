import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/User/IUser';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { IAddUserRequest } from 'src/app/interfaces/User/IAddUserRequest';
import { IUpdateUserRequest } from 'src/app/interfaces/User/IUpdateUserRequest';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  apiBaseUrl=environment.apiBaseUrl;

  getAllUsers(pageNo:number):Observable<User[]>{
    return this.http.get<User[]>(this.apiBaseUrl+'/api/users'+'?page='+ pageNo);
  }

  getAllDashUsers():Observable<User[]>{
    return this.http.get<User[]>(this.apiBaseUrl+'/api/users');
  }


  getOneUserById(id:any):Observable<User>{
    return this.http.get<User>(this.apiBaseUrl+'/api/users/'+id).pipe(catchError(this.handleError));
  }

  updateUser(id:string, updateUserRequest:IUpdateUserRequest ):Observable<User>{
    return this.http.put<User>(this.apiBaseUrl+'/api/users/'+id,updateUserRequest);
  }

  
  deleteUser(id:number){
    return this.http.delete<User>(this.apiBaseUrl+'/api/users/'+id);
  }


  changeStatus(id:number){
    return this.http.patch<User>(this.apiBaseUrl+"/api/users/"+id,id);
  }

  addUser(addUserRequest:IAddUserRequest ):Observable<User>{
    return this.http.post<User>(this.apiBaseUrl+'/api/users/',addUserRequest);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage='';
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      if(error.status==404){
        errorMessage='Not found'
      }
      
    }
    // Return an observable with a user-facing error message.

    return throwError(() => new Error(errorMessage));
  }
}
