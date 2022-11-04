import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from 'src/app/interfaces/Tag/ITag';
import { IUpdateTagRequest } from 'src/app/interfaces/Tag/IUpdateTagRequest';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { IAddTagRequest } from 'src/app/interfaces/Tag/IAddTagRequest';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http:HttpClient) { }

  apiBaseUrl=environment.apiBaseUrl;

  getAllTags(pageNo:number):Observable<Tag[]>{
    return this.http.get<Tag[]>(this.apiBaseUrl+'/api/tags'+'?page='+ pageNo);
  }

  getPostTags():Observable<Tag[]>{
    return this.http.get<Tag[]>(this.apiBaseUrl+'/api/tags');
  }

 
  getOneTagById(id:string):Observable<Tag>{
    return this.http.get<Tag>(this.apiBaseUrl+'/api/tags/'+id).pipe(catchError(this.handleError));
  }

  updateTag(id:string, updateTagRequest:IUpdateTagRequest ):Observable<Tag>{
    return this.http.put<Tag>(this.apiBaseUrl+'/api/tags/'+id,updateTagRequest);
  }

  
  deleteTag(id:number){
    return this.http.delete<Tag>(this.apiBaseUrl+'/api/tags/'+id);
  }


  changeStatus(id:number){
    return this.http.patch<Tag>(this.apiBaseUrl+"/api/tags/"+id,id);
  }

  addTag(addTagRequest:IAddTagRequest ):Observable<Tag>{
    return this.http.post<Tag>(this.apiBaseUrl+'/api/tags/',addTagRequest);
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
