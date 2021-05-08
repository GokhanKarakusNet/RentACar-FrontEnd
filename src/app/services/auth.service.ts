import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from './customer.service';
import { UserService } from './user.service';
import { PasswordChange } from '../models/passwordChange';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:44342/api/auth/';
  jwtHelper:JwtHelperService = new JwtHelperService();
  decodedToken:any;
  role:string[] = [];
  constructor(private httpClient:HttpClient,
    private router:Router,
    private toastrService:ToastrService,
    private customerService:CustomerService,
    private userService:UserService)
    {
      if (this.isAuthenticated()) {
        this.getRole();
      }
    }

  login(loginModel:TokenModel)
  {
    let newPath = this.apiUrl + "login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel).subscribe(response => {
      this.decodedToken = this.jwtHelper.decodeToken(response.data.token.toString());
      this.router.navigate(["cars"]);
      this.toastrService.info("Giriş yapıldı");
      localStorage.setItem('token',response.data.token);
      this.getRole();
      console.log(this.getCurrentUser())
      this.customerService.getCustomerByUserId(this.getCurrentUser().nameid).subscribe(response => {
        if (response.data) {
          localStorage.setItem("customerId",response.data.customerId.toString())
        }
      })
    },responseError => {
      this.toastrService.info(responseError.error);
    })
  }

  register(registerModel:TokenModel):Observable<SingleResponseModel<TokenModel>>
  {
    let newPath = this.apiUrl + "register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel);
  }

  logOut()
  {
    localStorage.clear();
  }

  isAuthenticated()
  {
    if (localStorage.getItem('token')) {
      return true;
    }
    else {
      return false;
    }
  }

  get token()
  {
    return localStorage.getItem('token');
  }

  getCurrentUser()
  {
    return this.jwtHelper.decodeToken(this.token!)
  }

  updatePassword(passwordChange:PasswordChange):Observable<ResponseModel>{
    let newPath = this.apiUrl + "changepassword"
    return this.httpClient.put<ResponseModel>(newPath,passwordChange)
  }

  getRole()
  {
    this.userService.getClaim(this.getCurrentUser().nameid).subscribe(response => {
      this.role = response.data.map(r => r.name);
    })
  }

  roleControl()
  {
      let role = this.role
      let lenght = role.length;
      for (let i = 0; i <= lenght; i++) {
        const element = role[i];
        if (element == 'admin' || element == 'car.update') {
          return true;
        }
        else {return false;}
      }
      return null
  }
}
