import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailWithoutAnyImageDto } from 'src/app/models/carDetailWithoutAnyImageDto';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail-with-image',
  templateUrl: './car-detail-with-image.component.html',
  styleUrls: ['./car-detail-with-image.component.css']
})
export class CarDetailWithImageComponent implements OnInit {

  carDetailDto:CarDetailWithoutAnyImageDto;
  carImages:CarImage[];
  imageUrl:string="https://localhost:44342/Resources/Images/"
  getCarDetailsDataLoaded=false

  constructor(private carService:CarService,private carImageService:CarImageService, private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params=> {
      this.getCarDetails(params["carId"]);
      this.getImageListByCarId(params["carId"]);
    }))
    
  }

  getCarDetails(carId:number){
    this.carService.getCarDetailDtoByCarId(carId).subscribe((response)=>{
      this.carDetailDto=response.data;  
      this.getCarDetailsDataLoaded=true         
    })
  }

  getImageListByCarId(carId:number){
    this.carImageService.getImageListByCarId(carId).subscribe((response)=>{
      this.carImages=response.data      
    })
  }
 
  getCurrentSlideClass(carImage:CarImage){
    if (carImage == this.carImages[0]) {
      return "carousel-item active"
    }
    return "carousel-item"
  }
}
