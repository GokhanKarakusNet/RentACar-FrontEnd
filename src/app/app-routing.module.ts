import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAdminComponent } from './components/admin/car-admin/car-admin.component';
import { BrandAdminComponent } from './components/admin/brand-admin/brand-admin.component';
import { CarComponent } from './components/car/car.component';
import { ColorAdminComponent } from './components/admin/color-admin/color-admin.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { SliderComponent } from './components/slider/slider.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './_helpers/login.guard';
import { CarDetailWithImageComponent } from './components/car-detail-with-image/car-detail-with-image.component';
import { RentThisCarComponent } from './components/rental/rent-this-car/rent-this-car.component';

const routes: Routes = [
  {path:"",redirectTo:"/home",pathMatch:"full"},
  {path:"home",component:SliderComponent},
  {path:"cars",component:CarComponent},
  {path:"colors",component:ColorAdminComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/cardetails/:carId",component:CarDetailWithImageComponent},
  {path:"rentcar/carId/:carId",component:RentThisCarComponent},
  {path:"customers",component:CustomerComponent},
  {path:"rentals",component:RentalComponent},
  {path:"admin/cars",component:CarAdminComponent,canActivate:[LoginGuard]},
  {path:"admin/brands",component:BrandAdminComponent,canActivate:[LoginGuard]},
  {path:"admin/colors",component:ColorAdminComponent,canActivate:[LoginGuard]},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
