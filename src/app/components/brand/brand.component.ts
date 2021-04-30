import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { EventService } from 'src/app/services/event-service.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands:Brand[]=[];
  currentBrand:number=0;
  selectedBrands:Brand[]=[];
  filterText = '';
  constructor(private brandService:BrandService,
    private activatedRoute: ActivatedRoute,
    private eventService:EventService) { }

  ngOnInit(): void {
    
    this.getBrands();
  }

 getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
    });
  }

  setCurrentBrand(brand:number){
    this.currentBrand=brand;
  }
  clearCurrentBrand()
  {
    //let emptyBrand:Brand = {id:0, name:""};
    this.currentBrand=0;
    this.getAllBrandClass();
  }
  getCurrentBrandClass(brand:number){
    if(brand==this.currentBrand){
      return "list-group-item list-group-item-action list-group-item-primary"
    }
    return "list-group-item list-group-item-action list-group-item-light"
  }
  getAllBrandClass(){
    if(!this.currentBrand||this.currentBrand===0){
      return "list-group-item list-group-item-action list-group-item-primary"
    }
    return "list-group-item list-group-item-action list-group-item-light"
  }

  selectBrand(brand:Brand){
    this.selectedBrands.push(brand);
    this.emitBrands();
  }
  
  emitBrands(){
    this.eventService.emit<Brand[]>(this.selectedBrands);
  }
}
