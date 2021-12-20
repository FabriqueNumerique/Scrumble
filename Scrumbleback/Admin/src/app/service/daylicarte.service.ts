import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Daylicarte } from '../model/daylicarte';
// import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class DaylicarteService {
  selectedDaylicarte:any = {titre: '', contenu: '' };
  daylicarte:Daylicarte[]=[];
  readonly apiURL='http://localhost:3051/api/dayli'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor( public httpClient: HttpClient) { }
    
  getAll(): Observable<any> {

    return this.httpClient.get(this.apiURL)

    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  create(postcarte:Daylicarte): Observable<any> {

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
  update(_id:string, postcarte:Daylicarte): Observable<any> {

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
  // postdayli(dayli:Daylicarte){
  //   return this.http.post(this.baseURL,dayli,this.httpOptions).pipe(map((res:any)=>{
  //     return res
  //   }))
  
  // }
  // putdayli(dayli: Daylicarte) {
  //   return this.http.patch(this.baseURL + `/${dayli._id}`, dayli).pipe(map((res:any)=>{
  //     return res
  //   }))
  // }
  //  getdayliList() {
  //   return this.http.get(this.baseURL);
  // }
  // deletedayli(_id: string) {
  //   return this.http.delete(this.baseURL + `/${_id}`);
  // }
}
