import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  currentBrand:Brand;
  nullBrand:Brand;
  brandFilterText="";

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {       
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  setCurrentBrand(brand: Brand) {
    this.currentBrand=brand;
  }

  getCurrentBrandClass(brand:Brand){
    if(brand==this.currentBrand){
      return "list-group-item list-group-item-success"
    }else{
      return "list-group-item"
    }
  }
  getAllBrandsClass(){
    if(this.currentBrand == null ) {
      return "list-group-item list-group-item-success"
    }else{
      return "list-group-item"
    }         
  }

  currentBrandResetter(nullBrand:Brand){
    this.currentBrand=nullBrand;
        
  }
  
}

