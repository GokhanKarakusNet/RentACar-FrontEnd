import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaim';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  apiUrl = 'https://localhost:44342/api/users/';

  getUserByMail(email:string):Observable<SingleResponseModel<User>>{
    let newPath=this.apiUrl+"getbyemail?email="+email
    return this.httpClient.get<SingleResponseModel<User>>(newPath)
  }

  updateUser(user:User):Observable<ResponseModel>{
    let newPath = this.apiUrl+"update"
    return this.httpClient.post<ResponseModel>(newPath,user)
  }

  getUser(userId:number):Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + "getforuserdetail/" + userId;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  updateUserInfo(user:User):Observable<ResponseModel>{
    let newPath = this.apiUrl + "updateuserinfo";
    return this.httpClient.put<ResponseModel>(newPath,user);
  }

  getClaim(userId:number):Observable<ListResponseModel<OperationClaim>> {
    let newPath = this.apiUrl + "getclaims/" + userId;
    return this.httpClient.get<ListResponseModel<OperationClaim>>(newPath);
  }

}
