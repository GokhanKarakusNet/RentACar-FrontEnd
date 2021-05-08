import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl="https://localhost:44342/api/customers/";
  constructor(private httpClient:HttpClient) { }

  getCustomerDetails():Observable<ListResponseModel<Customer>>{
    let newPath = this.apiUrl + "getcustomerdetails";
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getCustomers():Observable<ListResponseModel<Customer>> {
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl);
  }

  getCustomer(customerId:number):Observable<SingleResponseModel<Customer>> {
    let newPath = this.apiUrl + customerId;
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
  }

  getCustomerByUserId(userId:number):Observable<SingleResponseModel<Customer>> {
    let newPath = this.apiUrl + "getbyuserid/" + userId;
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
  }

  add(customer: Customer): Observable<SingleResponseModel<Customer>> {
    let newPath = this.apiUrl + "add";
    return this.httpClient.post<SingleResponseModel<Customer>>(newPath,customer);
  }
}