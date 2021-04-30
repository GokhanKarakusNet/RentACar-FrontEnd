import { CarImages } from "./carImage";

export class CarDetail {
  carId:number;
  brandName:string;
  colorName:string;
  dailyPrice:number;
  modelYear:string;
  description:string;
  imagePath:string;
  carImages:CarImages[];
  findeksValue:number;
  isRentable:boolean;
}
