import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { EventService } from 'src/app/services/event-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[] = [];
  dataLoaded = false;
  filterText = '';
  brands:Brand[] = [];
  colors:Color[] = [];
  control:boolean = false;
  selectedBrand:number=0;
  selectedColor:number=0;
  //imageUrl = environment.apiURL;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService,
    private route:Router,
    private brandService:BrandService,
    private colorService:ColorService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"] && params["colorId"])
     {
       if (this.selectedBrand !=0 || this.selectedColor !=0) {
        this.getCarsByFilter();
       }
       
     }
     else if(params["colorId"])
     {
       this.getCarsByColor(params["colorId"]);
       if (this.selectedColor !=0) {
        this.getCarsByFilter();
       }
     }
     else if (params["brandId"])
     {
       this.getCarsByBrand(params["brandId"]);
       if (this.selectedBrand !=0) {
        this.getCarsByFilter();
       }
     }
     else {
       this.getCars();
     }
  
   })
   this.getBrands();
    this.getColors();
 }

 
  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
      this.cars.length <= 0 ? this.control = true : false;
    });
  }
  getCarsById(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      (this.cars[0] = response.data), (this.dataLoaded = true);
    });
  }
  
  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.cars.length <= 0 ? this.control = true : false;
      this.dataLoaded = true;
    });
  }
  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.cars.length <= 0 ? this.control = true : false;
      this.dataLoaded = true;
    });
  }

  getBrands()
  {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
      console.log(this.brands);
    })
  }

  getColors()
  {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  getCarsByFilter()
  {
      this.carService.getCarsByFilter(this.selectedBrand,this.selectedColor).subscribe(response => {
      this.cars = response.data;
      this.cars.length <= 0 ? this.control = true : false;

    },errorResponse=>{
      this.cars.length <= 0 ? this.control = true : false;

      this.toastrService.error(errorResponse.error.message);
    });
    this.selectedColor=0;
    this.selectedBrand=0;
  }
  getRoute(carId:number)
  {
    this.route.navigateByUrl("/cars/car-detail/"+carId);
  }
  

}
