import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor(private httpClient:HttpClient) { }

  apiUrl = 'https://localhost:44342/api/creditcards/'

  
  getCreditCards():Observable<ListResponseModel<CreditCard>> {
    return this.httpClient.get<ListResponseModel<CreditCard>>(this.apiUrl);
  }

  getCreditCardsByCustomerId(customerId:number):Observable<ListResponseModel<CreditCard>> {
    let newPath = this.apiUrl+customerId;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }


  getSelectedCardByCustomerId(customerId:number):Observable<SingleResponseModel<CreditCard>>{
    let newPath= this.apiUrl+"getselectedcardbycustomerId/"+customerId
    return this.httpClient.get<SingleResponseModel<CreditCard>>(newPath);
  }
  addCreditCard(creditCard:CreditCard):Observable<ResponseModel>{
    let newPath= this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newPath,creditCard);
  }

  deleteCreditCard(creditCard:CreditCard):Observable<ResponseModel>{
    let newPath = this.apiUrl+"delete";
    return this.httpClient.post<ResponseModel>(newPath,creditCard);
  }
}
