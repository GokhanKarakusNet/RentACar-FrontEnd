import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44342/api/rentals/";
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "getrentalsdetailslist";
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }


  addRental(rental:Rental, nationalId:string):Observable<SingleResponseModel<Rental>>{
    let newPath = this.apiUrl+"add?nationalId="+nationalId    
    return this.httpClient.post<SingleResponseModel<Rental>>(newPath, rental)
  }

  checkRentability(rental:Rental):Observable<ResponseModel>{
    let newPath = this.apiUrl+"checkrentability"
    return this.httpClient.post<ResponseModel>(newPath,rental)
  }
}