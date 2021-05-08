import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl="https://localhost:44342/api/colors/";
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    let newPath= this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<Color>>(newPath)
  }

  addColor(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl+"add"
    return this.httpClient.post<ResponseModel>(newPath,color);
  }

  getColorByColorId(colorId:number):Observable<SingleResponseModel<Color>>{
    let newPath = this.apiUrl+"getbyid?id="+colorId;
    return this.httpClient.get<SingleResponseModel<Color>>(newPath)
  }

  updateColor(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl+"update"
    return this.httpClient.post<ResponseModel>(newPath,color)
  }

  deleteColor(color:Color):Observable<ResponseModel>{
    let newPath=this.apiUrl+"delete"
    return this.httpClient.post<ResponseModel>(newPath,color)
  }
}