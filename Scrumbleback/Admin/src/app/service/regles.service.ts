import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Regles } from '../model/regles';
@Injectable({
  providedIn: 'root'
})
export class ReglesService {

  private apiURL = "http://localhost:3051/api/regles";
     
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(public http: HttpClient) { }
     
  getAll(): Observable<any> {

    return this.http.get(this.apiURL)

    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  create(regles:Regles): Observable<any> {

    return this.http.post(this.apiURL, JSON.stringify(regles), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }  
  find(_id:string): Observable<any> {

    return this.http.get(this.apiURL + '/' + _id)

    .pipe(
      catchError(this.errorHandler)
    )
  }     
  update(_id:string, regles:Regles): Observable<any> {

    return this.http.patch(this.apiURL +'/'+ _id, JSON.stringify(regles), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  delete(_id:string){
    return this.http.delete(this.apiURL+'/'+ _id, this.httpOptions)

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
