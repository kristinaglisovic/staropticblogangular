import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IImage } from 'src/app/interfaces/Image/IImage';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http:HttpClient) { }

  apiBaseUrl=environment.apiBaseUrl;



  getAllImages(pageNo:number):Observable<IImage[]>{
    return this.http.get<IImage[]>(this.apiBaseUrl+'/api/images'+'?page='+ pageNo);
  }
}
