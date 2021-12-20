import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Pbcarte} from '../model/pbcarte';
@Injectable({
  providedIn: 'root'
})
export class PbcarteService {
    
  private apiURL = "http://localhost:3051/api/Pbcarte";
     
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
   
  constructor(private httpClient: HttpClient) { }
     
  getAll(): Observable<any> {

    return this.httpClient.get(this.apiURL)

    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  create(postcarte:Pbcarte): Observable<any> {

    return this.httpClient.post(this.apiURL, JSON.stringify(postcarte), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }  
  find(_id:string): Observable<any> {

    return this.httpClient.get(this.apiURL + '/' + _id)

    .pipe(
      catchError(this.errorHandler)
    )
  }     
  update(_id:string, postcarte:Pbcarte): Observable<any> {

    return this.httpClient.patch(this.apiURL +'/'+ _id, JSON.stringify(postcarte), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  delete(_id:string){
    return this.httpClient.delete(this.apiURL+'/'+ _id, this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}

