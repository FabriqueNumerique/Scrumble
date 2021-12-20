import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Userstories1 } from '../model/userstories1';

@Injectable({
  providedIn: 'root'
})
export class Userstories1A1Service {
  private apiURL = "http://localhost:3051/paquet1.1";
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
  find(id:number): Observable<any> {

    return this.httpClient.get(this.apiURL + '/' + id)

    .pipe(
      catchError(this.errorHandler)
    )
  }   
  
  create(postcarte:Userstories1): Observable<any> {

    return this.httpClient.post(this.apiURL, JSON.stringify(postcarte), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }  
  
  update(id:number, postcarte:Userstories1): Observable<any> {

    return this.httpClient.put(this.apiURL +'/'+ id, JSON.stringify(postcarte), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  delete(id:number){
    return this.httpClient.delete(this.apiURL+'/'+ id, this.httpOptions)

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
