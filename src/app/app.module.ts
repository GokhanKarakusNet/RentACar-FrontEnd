import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from "ngx-toastr";
import { SwiperModule } from 'swiper/angular';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import { NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';


import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormBuilder, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, TooltipModule, PopoverModule, ButtonsModule } from 'angular-bootstrap-md';
import { MDBBootstrapModule, DropdownModule } from 'angular-bootstrap-md';
import { FileUploadModule } from 'ng2-file-upload';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SliderComponent } from './components/slider/slider.component';
import { QuickBookingComponent } from './components/quick-booking/quick-booking.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerSelectionComponent } from './components/customer/customer-selection/customer-selection.component';
import { BrandAdminComponent } from './components/admin/brand-admin/brand-admin.component';
import { ColorAdminComponent } from './components/admin/color-admin/color-admin.component';
import { CarAdminComponent } from './components/admin/car-admin/car-admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AlertComponent } from './components/alert/alert.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CarDetailWithImageComponent } from './components/car-detail-with-image/car-detail-with-image.component';
import { RentThisCarComponent } from './components/rental/rent-this-car/rent-this-car.component';
import { NaviComponent } from './components/navi/navi.component';
import { LocalStorageService } from './services/local-storage.service';
import { LoadInterceptor } from './interceptors/load.interceptor';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    QuickBookingComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    BrandFilterPipe,
    ColorFilterPipe,
    CarFilterPipe,
    CustomerSelectionComponent,
    BrandAdminComponent,
    ColorAdminComponent,
    CarAdminComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    CarDetailWithImageComponent,
    RentThisCarComponent,
    NaviComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    FormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSelectModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ModalModule,
    TooltipModule,
    PopoverModule,
    ButtonsModule,
    MDBBootstrapModule.forRoot(),
    DropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    FileUploadModule
  ],
  providers: [
    { provide:  HTTP_INTERCEPTORS,  useClass: LoadInterceptor, multi: true  },
    { provide:  HTTP_INTERCEPTORS,  useClass: AuthInterceptor, multi: true  },
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
