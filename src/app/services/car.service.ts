import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl="https://localhost:44342/api/";
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsdetail";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarById(carId: number): Observable<SingleResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getcardetail?carId=' + carId;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }
  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsdetailbybrandid?id="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsdetailbycolorid?id="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByFilter(brandId:number,colorId:number):Observable<ListResponseModel<Car>> {
    let newPath:string = "";
    if(brandId != undefined && colorId != undefined && colorId!=0 && brandId!=0)
    newPath = this.apiUrl + "cars/getcarsdetailbybrandandbycolorid?brandId=" + brandId + "&colorId=" + colorId;
    else if(brandId != undefined)
    newPath = this.apiUrl + "cars/getcarsdetailbybrandid?id=" + brandId;
    else if(colorId != undefined)
    newPath = this.apiUrl + "cars/getcarsdetailbycolorid?id=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  add(car:Car):Observable<ItemResponseModel<Car>>{
    return this.httpClient.post<ItemResponseModel<Car>>(this.apiUrl+"cars/add",car)
  }

  update(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl+"update";
    return this.httpClient.post<ResponseModel>(newPath, car)
  }

  delete(id:number):Observable<ResponseModel>{
    let newPath = this.apiUrl+"delete?id="+id;
    return this.httpClient.post<ResponseModel>(newPath,id)
  }
}
