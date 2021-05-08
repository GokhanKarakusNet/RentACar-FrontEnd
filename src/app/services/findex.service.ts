import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Findex } from '../models/findex';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FindexService {

  constructor(private httpClient:HttpClient) { }

  apiUrl="https://localhost:44342/api/findeks/";

  getFindexByCustomerId(customerId:number):Observable<SingleResponseModel<Findex>>{
    let newPath= this.apiUrl+"getbycustomerId?customerId="+customerId
    return this.httpClient.get<SingleResponseModel<Findex>>(newPath)
  }

  add(creditNote: Findex): Observable<SingleResponseModel<Findex>> {
    let newPath = this.apiUrl + "add";
    return this.httpClient.post<SingleResponseModel<Findex>>(newPath,creditNote);
  }

}