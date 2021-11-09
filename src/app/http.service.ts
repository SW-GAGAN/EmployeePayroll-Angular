import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  postApicall(data: any) {
    throw new Error('Method not implemented.');
  }
  private baseUrl: string = "http://localhost:8080/employees";

  constructor(private httpClient: HttpClient) {
    
  }

  getEmployeeData(): Observable<any> {
    return this.httpClient.get(this.baseUrl + "/get");
  }

  addEmployeeData(body: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "/add" ,body);
  }
  
  deleteEmployeeData(employeeId: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + "/delete", 
    {
      headers: new HttpHeaders(),
      params: new HttpParams().append('id', employeeId)
    })
  }

}
