import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CarService } from 'src/app/services/car.service';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { timer } from 'rxjs';
import { Bank } from 'src/app/models/bank';
import { CreditCard } from 'src/app/models/creditCard';
import { CarDetailWithoutAnyImageDto } from 'src/app/models/carDetailWithoutAnyImageDto';
import { FindexService } from 'src/app/services/findex.service';
import { BankService } from 'src/app/services/bank.service';
import { Findex } from 'src/app/models/findex';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { CarDetailWithImageComponent } from '../../car-detail-with-image/car-detail-with-image.component';


@Component({
  selector: 'app-rent-this-car',
  templateUrl: './rent-this-car.component.html',
  styleUrls: ['./rent-this-car.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class RentThisCarComponent implements OnInit,OnChanges,OnDestroy{

  rental: Rental = new Rental();
  bank:Bank = new Bank();
  creditCards:CreditCard[]
  customer:Customer=new Customer();
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  car:CarDetailWithoutAnyImageDto=new CarDetailWithoutAnyImageDto();
  creditNote:Findex=new Findex();
  payment:number;
  findeksValue:number;
  control:boolean = true;


  constructor(private formBuilder: FormBuilder,
    config: NgbModalConfig, private modalService: NgbModal,
    private bankService:BankService,
    private activatedRoute:ActivatedRoute,
    private carService:CarService,
    private customerService:CustomerService,
    private authService:AuthService,
    private rentalService:RentalService,
    private toastrService:ToastrService,
    private creditCardService:CreditCardService,
    private router:Router,
    private findeksService: FindexService
    ) {}

  ngOnDestroy(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {
   
      this.customer.customerId = Number(localStorage.getItem("customerId"));
      this.getCustomerCardListByCustomerId(this.customer.customerId);
      this.createAddForm();
      this.activatedRoute.params.subscribe((parameter) => {
        if (parameter["carId"]) {
            this.getCar(parameter["carId"]);
        }
      })

  }

  open(content:any) {
    this.modalService.open(content);
  }

  close(content:any){
    this.modalService.dismissAll(content);
  }

  cardRegistrationQuestion(contentt:any)
  {
    if (this.control) {
      this.modalService.open(contentt);
    }
  }

  createAddForm()
  {
    this.firstFormGroup = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      companyName:['',Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      nameOnTheCard: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }

  getCar(carId:number)
  {
    this.carService.getCarDetailDtoByCarId(carId).subscribe(response => {
      this.car = response.data;
    })
  }


  paymentFee()
  {
    var rentDate = new Date(this.firstFormGroup.controls["rentDate"].value.toString());
    var returnDate = new Date(this.firstFormGroup.controls["returnDate"].value.toString());
    var difference= returnDate.getTime() - rentDate.getTime();
    var time = Math.ceil(difference / (1000 * 3600 * 24));
    this.payment = this.car.dailyPrice * time
  }

  addCreditNote()
  {
    this.creditNote.userId = parseInt(this.authService.getCurrentUser().nameid);
    return this.findeksService.add(this.creditNote);
  }

  addCustomer()
  {
    this.customer.userId = parseInt(this.authService.getCurrentUser().nameid);
    this.customer.companyName = this.firstFormGroup.controls['companyName'].value;
    return this.customerService.add(this.customer);
  }

  addRental()
  {
    this.rental.customerId = this.customer.customerId;
    this.rental.carId = this.car.carId;
    this.rental.rentDate =this.firstFormGroup.controls["rentDate"].value
    this.rental.returnDate =this.firstFormGroup.controls["returnDate"].value
    return this.rentalService.addRental(this.rental,this.creditNote.nationalIdentity);
  }

  localSaved(customerId:number)
  {
    localStorage.setItem("customerId",customerId.toString());
  }

  savedCard(creditCard:CreditCard,content:any)
  {
    this.secondFormGroup.patchValue({
      nameOnTheCard:creditCard.nameOnTheCard,
      expirationDate:creditCard.expirationDate,
      cvv:creditCard.cvv,
      cardNumber:creditCard.cardNumber,
      selectedCard:creditCard.selectedCard
    })
    this.control = false;
   // this.open(content);
  }

  removeCard(creditCard:CreditCard)
  {
    this.creditCardService.deleteCreditCard(creditCard).subscribe(() => {
      this.getCustomerCardListByCustomerId(this.customer.customerId);
      this.toastrService.info("Kartınız Silindi");
    },err => {
      this.toastrService.info(err);
    })
  }

  getCreditNote()
  {
    return this.findeksService.getFindexByNationalId(this.creditNote.nationalIdentity)
    .subscribe(response=>{
      this.findeksValue=response.data.findeksValue;
    })
    // this.creditNote.userId = parseInt(this.authService.getCurrentUser().nameid);
    // return this.findeksService.add(this.creditNote);
  }

  async addBank()
  {
    // this.addCreditNote().subscribe(response => {
    //   this.findeksValue = response.data.findeksValue;
    //   console.log("findekkkkksss====="+this.findeksValue)

    // })
    this.getCreditNote()
    timer(500).subscribe(p => {
      if (this.findeksValue >= this.car.minFindeksValue) {
        if (this.customer.customerId == 0)
      {
        this.addCustomer().subscribe(response => {
          this.customer.customerId = response.data.customerId
          this.localSaved(this.customer.customerId);
        })
      }
      timer(500).subscribe(p => {
        this.addRental().subscribe(response => {
          this.rental.id = response.data.id;
          timer(1000).subscribe(p => {
            this.bank = Object.assign({},this.secondFormGroup.value);
            this.bank.rentId = this.rental.id;
            this.bankService.addBank(this.bank).subscribe(response => {
              this.toastrService.success("Araç Kiralandı");
            })
          })
        },err => {
          this.toastrService.error(err.error.message,"Başarısız");
          this.router.navigate(['/cars'])
        })
      })

      }
      else
      {
        this.control = false;
        this.toastrService.error("Üzgünüm Findeks Puanınız Bu Aracı Kiralamak İçin Yeterli Değil","Başarısız")
        this.router.navigate(['/cars'])
      }
    })
  }

  cardSaved()
  {
    let newCart:CreditCard 
    newCart = Object.assign({},this.secondFormGroup.value);
    newCart.customerId = this.customer.customerId
    this.creditCardService.addCreditCard(newCart).subscribe(response => {
      this.getCustomerCardListByCustomerId(this.customer.customerId);
      this.toastrService.info("Kredi Kartınız Kayıt Edildi","Başarılı")
      timer(1000).subscribe(p => {
        this.router.navigate(['/cars']);
      })
    })
  }

  getCustomerCardListByCustomerId(customerId:number)
  {
    this.creditCardService.getCreditCardsByCustomerId(customerId).subscribe(response => {
      this.creditCards = response.data
    })
  }




}
