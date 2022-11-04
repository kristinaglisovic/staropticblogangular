import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/interfaces/Category/ICategory';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { IUpdateCategoryRequest } from 'src/app/interfaces/Category/IUpdateCategoryRequest';
import { IAddCategoryRequest } from 'src/app/interfaces/Category/IAddCategoryRequest';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  apiBaseUrl=environment.apiBaseUrl;

  getAllCategories(pageNo:number):Observable<Category[]>{
    return this.http.get<Category[]>(this.apiBaseUrl+'/api/categories'+'?page='+ pageNo);
  }

  getAllPostCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.apiBaseUrl+'/api/categories');
  }
 

  getOneCategoryById(id:string):Observable<Category>{
    return this.http.get<Category>(this.apiBaseUrl+'/api/categories/'+id).pipe(catchError(this.handleError));
  }

  updateCategory(id:string, updateCategoryRequest:IUpdateCategoryRequest ):Observable<Category>{
    return this.http.put<Category>(this.apiBaseUrl+'/api/categories/'+id,updateCategoryRequest);
  }

  addCategory(addCategoryRequest:IAddCategoryRequest ):Observable<Category>{
    return this.http.post<Category>(this.apiBaseUrl+'/api/categories/',addCategoryRequest);
  }

  deleteCategory(id:number){
    return this.http.delete<Category>(this.apiBaseUrl+'/api/categories/'+id);
  }

  changeStatus(id:number){
    return this.http.patch<Category>(this.apiBaseUrl+"/api/categories/"+id,id);
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
