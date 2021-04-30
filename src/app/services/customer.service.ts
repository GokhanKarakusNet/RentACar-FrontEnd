import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl="https://localhost:44342/api/customers/";
  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>>{
    let newPath = this.apiUrl + "getcustomerdetails";
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getCustomer(customerId:number):Observable<ItemResponseModel<Customer>> {
    let newPath = this.apiUrl + customerId;
    return this.httpClient.get<ItemResponseModel<Customer>>(newPath);
  }
}