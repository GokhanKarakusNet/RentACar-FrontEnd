import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetailWithMainImageDto } from '../models/carDetailWithMainImageDto';
import { CarDetailWithoutAnyImageDto } from '../models/carDetailWithoutAnyImageDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl="https://localhost:44342/api/cars/";
  constructor(private httpClient:HttpClient) { }

  getCarsDto(): Observable<ListResponseModel<CarDetailWithMainImageDto>> {
    let newPath = this.apiUrl + 'getcarsdetails';
    return this.httpClient.get<ListResponseModel<CarDetailWithMainImageDto>>(newPath);
  }

  //Gerekmeyebilir.
  getCars():Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarByCarId(carId:number):Observable<SingleResponseModel<Car>>{
    let newPath = this.apiUrl+"getbyid?id="+carId
    return this.httpClient.get<SingleResponseModel<Car>>(newPath)
  }

  getCarDetailDtoByCarId(carId:number):Observable<SingleResponseModel<CarDetailWithoutAnyImageDto>>{
    let newPath = this.apiUrl+"getcardetailsbycarid?carId="+carId;
    return this.httpClient.get<SingleResponseModel<CarDetailWithoutAnyImageDto>>(newPath);
  }

  getCarsByBrandId(brandId: number): Observable<ListResponseModel<CarDetailWithMainImageDto>> {
    let newPath =
      this.apiUrl + 'getcarsdetailsbybrandid?brandId=' + brandId;

    return this.httpClient.get<ListResponseModel<CarDetailWithMainImageDto>>(newPath);
  }

  getCarsByColorId(colorId: number): Observable<ListResponseModel<CarDetailWithMainImageDto>> {
    let newPath =
      this.apiUrl + 'getcarsdetailsbycolorid?colorId=' + colorId;

    return this.httpClient.get<ListResponseModel<CarDetailWithMainImageDto>>(newPath);
  }

  getCarsByBrandIdAndColorId(brandId:number,colorId:number):Observable<ListResponseModel<CarDetailWithMainImageDto>>{
    let newPath=this.apiUrl+"getcarsdetailsbybrandidandcolorid?brandId="+brandId+"&&colorId="+colorId
    return this.httpClient.get<ListResponseModel<CarDetailWithMainImageDto>>(newPath);
  }

  addCar(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl+"add"
    return this.httpClient.post<ResponseModel>(newPath,car);
  }

  updateCar(car:Car):Observable<ResponseModel>{
    let newPath=this.apiUrl+"update";
    return this.httpClient.post<ResponseModel>(newPath, car)
  }

  deleteCar(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl+"delete"
    return this.httpClient.post<ResponseModel>(newPath,car)
  }

  // //Test
  // getImageByImageIdTest(id:number):Observable<SingleResponseModel<CarImage>>{
  //   let path= this.apiUrl+"carimages/getimagebyid?id="+id
  //   return this.httpClient.get<SingleResponseModel<CarImage>>(path);
  // }





















  // getCarById(carId: number): Observable<SingleResponseModel<Car>> {
  //   let newPath = this.apiUrl + 'getcardetail?carId=' + carId;
  //   return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  // }
  // getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
  //   let newPath = this.apiUrl + "getcarsdetailbybrandid?id="+brandId;
  //   return this.httpClient.get<ListResponseModel<Car>>(newPath);
  // }
  // getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
  //   let newPath = this.apiUrl + "getcarsdetailbycolorid?id="+colorId;
  //   return this.httpClient.get<ListResponseModel<Car>>(newPath);
  // }

  // getCarsByFilter(brandId:number,colorId:number):Observable<ListResponseModel<Car>> {
  //   let newPath:string = "";
  //   if(brandId != undefined && colorId != undefined && colorId!=0 && brandId!=0)
  //   newPath = this.apiUrl + "getcarsdetailbybrandandbycolorid?brandId=" + brandId + "&colorId=" + colorId;
  //   else if(brandId != undefined)
  //   newPath = this.apiUrl + "getcarsdetailbybrandid?id=" + brandId;
  //   else if(colorId != undefined)
  //   newPath = this.apiUrl + "getcarsdetailbycolorid?id=" + colorId;
  //   return this.httpClient.get<ListResponseModel<Car>>(newPath);
  // }

  // add(car:Car):Observable<SingleResponseModel<Car>>{
  //   return this.httpClient.post<SingleResponseModel<Car>>(this.apiUrl+"add",car)
  // }

  // update(car:Car):Observable<ResponseModel>{
  //   let newPath = this.apiUrl+"update";
  //   return this.httpClient.post<ResponseModel>(newPath, car)
  // }

  // delete(id:number):Observable<ResponseModel>{
  //   let newPath = this.apiUrl+"delete?id="+id;
  //   return this.httpClient.post<ResponseModel>(newPath,id)
  // }
}
