import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IAddPostRequest } from 'src/app/interfaces/Post/IAddPostRequest';
import { IUpdatePostRequest } from 'src/app/interfaces/Post/IUpdatePostRequest';
import { environment } from 'src/environments/environment';
import { Post } from '../../interfaces/Post/IPost';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  apiBaseUrl=environment.apiBaseUrl;



  getAllPosts(pageNo:number):Observable<Post[]>{
    return this.http.get<Post[]>(this.apiBaseUrl+'/api/posts'+'?page='+ pageNo);
  }

  getAllSearchPosts(pageNo:number,keyword:string):Observable<Post[]>{
    return this.http.get<Post[]>(this.apiBaseUrl+'/api/posts'+'?page='+ '&keyword='+keyword);
  }
  getAllFDashPosts():Observable<Post[]>{
    return this.http.get<Post[]>(this.apiBaseUrl+'/api/posts');
  }

  getOnePostById(id:string):Observable<Post>{
    return this.http.get<Post>(this.apiBaseUrl+'/api/posts/'+id).pipe(catchError(this.handleError));
  }

  updatePost(id:string, updatePostRequest:IUpdatePostRequest ):Observable<Post>{
    return this.http.put<Post>(this.apiBaseUrl+'/api/posts/'+id,updatePostRequest);
  }

  deletePost(id:number){
    return this.http.delete<Post>(this.apiBaseUrl+'/api/posts/'+id);
  }

  addPost(addPostRequest:IAddPostRequest):Observable<Post>{
    return this.http.post<Post>(this.apiBaseUrl+'/api/posts/',addPostRequest).pipe(catchError(this.handleError));
  }


  changeStatus(id:number){
    return this.http.patch<Post>(this.apiBaseUrl+"/api/posts/"+id,id);
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
