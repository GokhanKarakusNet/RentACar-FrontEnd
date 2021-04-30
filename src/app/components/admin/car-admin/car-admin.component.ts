import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
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
    private formBuilder: FormBuilder
  ) { }

  selectedCar: Car;
  carToUpdated: Car;
  allCars: Car[];
  selectedCarDataLoaded = false;
  selectionforAdd: boolean = true
  selectionForEdit: boolean = false
  imageUrl: string = 'https://localhost:44342/Resources/Images/';

  carUpdateForm: FormGroup
  carAddForm: FormGroup;

  selectionAdd(selection: boolean) {
    this.selectionforAdd = selection;
    this.selectionForEdit = false;
    this.selectedCarResetter(false)    
  }
  selectionEdit(selection: boolean) {
    this.selectionforAdd = false;
    this.selectionForEdit=selection 
  }

  ngOnInit(): void {
    this.getAllCarsDto();
    this.createCarUpdateForm();
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
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      carName: ['', Validators.required],
      modelYear: ['', [Validators.required]],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
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
    });
  }

  addCar() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      this.carService.add(carModel).subscribe((response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.carUpdateForm.reset()
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
      this.toastrService.error('Giriş yaptığınız bilgileri kontrol ediniz.','Dikkat');
    }
  }

  getSelectedCar(carId: number) {
    this.carService.getCarById(carId).subscribe(response => {
      this.selectedCar = response.data;
      this.selectedCarDataLoaded = true;
      //console.log(this.selectedCar)      
    })
  }

  selectedCarResetter(newValue: boolean) {
    this.selectedCarDataLoaded = newValue;
  }

  updateCar(carId: number) {
    this.getSelectedCar(carId);
    if (this.carUpdateForm.valid) {
      let carModelToUpdate = Object.assign({}, this.carUpdateForm.value);
      carModelToUpdate.id = this.selectedCar.carId;
      this.carService.update(carModelToUpdate).subscribe(response => {
        this.toastrService.success(response.message, 'Başarılı');
        this.selectedCarResetter(false)
        this.carUpdateForm.reset()
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


  getAllCarsDto() {
    this.carService.getCars().subscribe(response => {
      this.allCars = response.data;
    })
  }


}