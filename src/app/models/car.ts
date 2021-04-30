import { CarImages } from "./carImage";

export class Car{
    carId:number;
    brandId:number;
    colorId:number;
    carName:string;
    brandName:string;
    colorName:string;
    modelYear:number;
    dailyPrice:number;
    description:string;
    carImages:CarImages[];
    isRentable:boolean;
    
}