import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAdminComponent } from './components/admin/car-admin/car-admin.component';
import { BrandAdminComponent } from './components/admin/brand-admin/brand-admin.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorAdminComponent } from './components/admin/color-admin/color-admin.component';
import { CustomerComponent } from './components/customer/customer.component';
import { DeneComponent } from './components/dene/dene.component';
import { HireComponent } from './components/hire/hire.component';
import { RentalComponent } from './components/rental/rental.component';
import { SliderComponent } from './components/slider/slider.component';

const routes: Routes = [
  {path:"",redirectTo:"/home",pathMatch:"full"},
  {path:"home",component:SliderComponent},
  {path:"cars",component:CarComponent},
  {path:"colors",component:ColorAdminComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/car-detail/:carId",component:CarDetailComponent},
  {path:"cars/hire/:carId",component:HireComponent},
  {path:"customers",component:CustomerComponent},
  {path:"rentals",component:RentalComponent},
  {path:"dene",component:DeneComponent},
  {path:"admin/cars",component:CarAdminComponent},
  {path:"admin/brands",component:BrandAdminComponent},
  {path:"admin/colors",component:ColorAdminComponent},


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
