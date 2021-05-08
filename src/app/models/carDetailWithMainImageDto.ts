import { CarDetailWithoutAnyImageDto } from "./carDetailWithoutAnyImageDto";
import { CarImage } from "./carImage";

export interface CarDetailWithMainImageDto extends CarDetailWithoutAnyImageDto{
    
    mainImage:CarImage    
}