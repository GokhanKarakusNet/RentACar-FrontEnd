import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';
import { CarDetailWithMainImageDto } from '../models/carDetailWithMainImageDto';

@Pipe({
  name: 'carNameFilterPipe'
})
export class CarFilterPipe implements PipeTransform {

  transform(value: CarDetailWithMainImageDto[], carNameFilterText: string): CarDetailWithMainImageDto[] {
    carNameFilterText= carNameFilterText?carNameFilterText.toLocaleLowerCase():""
    return carNameFilterText?value.filter((n:CarDetailWithMainImageDto)=>n.carName.toLocaleLowerCase().indexOf(carNameFilterText)!==-1 || n.brandName.toLocaleLowerCase().indexOf(carNameFilterText)!==-1):value;
  }

}