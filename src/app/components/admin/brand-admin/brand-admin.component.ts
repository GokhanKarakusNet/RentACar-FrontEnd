import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-admin',
  templateUrl: './brand-admin.component.html',
  styleUrls: ['./brand-admin.component.css']
})
export class BrandAdminComponent implements OnInit {

  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  allBrands: Brand[];
  selectedBrand: Brand;
  allBrandsDataLoaded = false
  selectedBrandDataLoaded = false
  selectionForAdd: boolean = true
  selectionForEdit: boolean = false
  brandUpdateForm: FormGroup;
  brandAddForm: FormGroup;

  ngOnInit(): void {
    this.getAllBrands();
    this.createAddBrandForm()
  }

  selectionAdd(selection: boolean) {
    this.selectionForAdd = selection;
    this.selectionForEdit = false;
    this.resetSelectedBrand(false)
  }
  selectionEdit(selection: boolean) {
    this.selectionForAdd = false;
    this.selectionForEdit = selection
  }

  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      brandName: ["", Validators.required]
    });
  }
  createAddBrandForm() {
    this.brandAddForm = this.formBuilder.group({
      brandName: ["", Validators.required]
    });
  }

  addBrand() {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value)
      this.brandService.add(brandModel).subscribe(response => {
        this.toastrService.success(response.message, 'Başarılı');
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
        })
    }
    else {
      this.toastrService.error(
        'Giriş yaptığınız bilgileri kontrol ediniz.',
        'Dikkat'
      );
    }
  }

  resetSelectedBrand(newValue: boolean) {
    this.selectedBrandDataLoaded = newValue
  }
  getAllBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.allBrands = response.data
      this.allBrandsDataLoaded = true;
    })
  }

  getBrandByBrandId(id: number) {
    this.createBrandUpdateForm()
    this.brandService.getBrandByBrandId(id).subscribe(response => {
      this.selectedBrand = response.data
      this.selectedBrandDataLoaded = true
      console.log("get metodundan" + this.selectedBrand.brandName)
    })
  }

  updateBrand() {
    if (this.brandUpdateForm.valid) {
      let brandModel: Brand = Object.assign({}, this.brandUpdateForm.value)
      brandModel.brandId = this.selectedBrand.brandId
      this.brandService.updateBrand(brandModel).subscribe(response => {
        this.toastrService.success(response.message, 'Başarılı');
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
        })
    }
    else {
      this.toastrService.error(
        'Giriş yaptığınız bilgileri kontrol ediniz.',
        'Dikkat'
      );
    }
  }

  deleteBrand(id: number) {
    let brandToDelete: Brand
    this.brandService.getBrandByBrandId(id).subscribe(response => {
      brandToDelete = response.data
      this.brandService.deleteBrand(id).subscribe(response => {
        this.toastrService.success(response.message, "Silindi")
      }, responseError => {
        this.toastrService.error(responseError.message)
      })
    })
  }

}