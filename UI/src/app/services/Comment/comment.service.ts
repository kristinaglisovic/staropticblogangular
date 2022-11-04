import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IAddCommentRequest } from 'src/app/interfaces/Comment/IAddCommentRequest';
import { IComment } from 'src/app/interfaces/Comment/IComment';
import { IUpdateCommentRequest } from 'src/app/interfaces/Comment/IUpdateCommentRequest';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }

  apiBaseUrl=environment.apiBaseUrl;

  getAllComments(pageNo:number):Observable<IComment[]>{
    return this.http.get<IComment[]>(this.apiBaseUrl+'/api/comments'+'?page='+ pageNo);
  }

  getAllDashComments():Observable<IComment[]>{
    return this.http.get<IComment[]>(this.apiBaseUrl+'/api/comments');
  }

  


  getOneCommentById(id:number):Observable<IComment>{
    return this.http.get<IComment>(this.apiBaseUrl+'/api/comments/'+id).pipe(catchError(this.handleError));
  }

  changeStatus(id:number):Observable<Comment>{
    return this.http.put<Comment>(this.apiBaseUrl+'/api/comments/'+id,id);
  }

  
  deleteComment(id:number){
    return this.http.delete<Comment>(this.apiBaseUrl+'/api/comments/'+id);
  }




  addComment(addCommentRequest:IAddCommentRequest ):Observable<Comment>{
    return this.http.post<Comment>(this.apiBaseUrl+'/api/comments/',addCommentRequest);
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
