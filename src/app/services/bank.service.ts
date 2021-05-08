import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank } from '../models/bank';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  apiUrl = "https://localhost:44342/api/banks/";
  constructor(private httpClient: HttpClient) { }

  addBank(bank:Bank):Observable<SingleResponseModel<Bank>> {
    let newPath = this.apiUrl + "add";
    return this.httpClient.post<SingleResponseModel<Bank>>(newPath,bank);
  }

}