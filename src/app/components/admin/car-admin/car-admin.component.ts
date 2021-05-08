import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetailWithMainImageDto } from 'src/app/models/carDetailWithMainImageDto';
import { CarDetailWithoutAnyImageDto } from 'src/app/models/carDetailWithoutAnyImageDto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-admin',
  templateUrl: './car-admin.component.html',
  styleUrls: ['./car-admin.component.css']
})
export class CarAdminComponent implements OnInit {
  brands: Brand[];
  colors: Color[];
  carId: number;
  constructor(
    private carService: CarService,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  selectedCar: CarDetailWithoutAnyImageDto;
  carToUpdated: CarDetailWithoutAnyImageDto;
  allCars: CarDetailWithMainImageDto[];
  selectedCarDataLoaded = false;
  selectionforAdd: boolean = true
  selectionForEdit: boolean = false
  imageUrl: string = 'https://localhost:44342/Resources/Images/';

  carUpdateForm: FormGroup;
  carAddForm: FormGroup;

  selectionAdd(selection: boolean) {
    this.selectionforAdd = selection;
    this.selectionForEdit = false;
    this.selectedCarResetter(false)
  }
  selectionEdit(selection: boolean) {
    this.selectionforAdd = false;
    this.selectionForEdit = selection
  }

  ngOnInit(): void {
    this.getAllCarsDto();
 
   
  
    
    this.createCarAddForm();
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      carId:[this.selectedCar.carId],
      brandId: [this.selectedCar.brandId, Validators.required],
      colorId: [this.selectedCar.colorId, Validators.required],
      carName: [this.selectedCar.carName, Validators.required],
      modelYear: [this.selectedCar.modelYear, [Validators.required, Validators.min(1500)]],
      dailyPrice: [this.selectedCar.dailyPrice, Validators.required],
      description: [this.selectedCar.description, Validators.required],
      minFindeksValue:[this.selectedCar.minFindeksValue, [Validators.required, Validators.min(0),Validators.max(1900)]]
    });
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      carName: ['', Validators.required],
      modelYear: ['', [Validators.required, Validators.min(1500)]],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
      minFindeksValue: ['', [Validators.required, Validators.min(0), Validators.max(1900)]]
    });
  }

  addCar() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      console.log(carModel)
      this.carService.addCar(carModel).subscribe((response) => {
        this.toastrService.success(response.message, 'Başarılı');
        this.carUpdateForm.reset()
        this.getAllCarsDto()

      },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
              this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama hatası');
            }
          }
        }
      );
    } else {
      console.log(this.carAddForm)

      this.toastrService.error('Giriş yaptığınız bilgileri kontrol ediniz.', 'Dikkat');
    }
  }

  getSelectedCar(carId: number) {
    this.carService.getCarDetailDtoByCarId(carId).subscribe(response => {
      this.selectedCar = response.data;
      this.selectedCarDataLoaded = true;
      this.createCarUpdateForm();
      //console.log(this.selectedCar)      
    })
  }

  selectedCarResetter(newValue: boolean) {
    this.selectedCarDataLoaded = newValue;
  }

  updateCar(carId: number) {
   
    if (this.carUpdateForm.valid) {
      let carModelToUpdate = Object.assign({}, this.carUpdateForm.value);
      
      this.carService.updateCar(carModelToUpdate).subscribe(response => {
        this.toastrService.success(response.message, 'Başarılı');
        this.getAllCarsDto()
        this.carUpdateForm.reset()
        
        this.selectedCarResetter(false)
      },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      )
    } else {
      this.toastrService.error(
        'Giriş yaptığınız bilgileri kontrol ediniz.',
        'Dikkat'
      );
    }
  }

  deleteCar(id:number){
    let carToDelete:CarDetailWithoutAnyImageDto;
    this.carService.getCarByCarId(id).subscribe(response=>{
      carToDelete=response.data
       this.carService.deleteCar(carToDelete).subscribe(response=>{
      this.toastrService.success(response.message,"Silindi")
      this.getAllCarsDto()
    },responseError=>{
      this.toastrService.error(responseError.message)
    })
    },responseError=>{
      this.toastrService.error("Belirtilen araca ulaşılamadı","Hata")
    })   
   
    }

  getAllCarsDto() {
    this.carService.getCarsDto().subscribe(response => {
      this.allCars = response.data;
    })
  }


}