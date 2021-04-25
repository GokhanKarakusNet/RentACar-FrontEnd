import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors:Color[]=[];
  currentColor:number=0;
  constructor(private colorService:ColorService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        this.currentColor=params['colorId'];
      }
    }); 
    this.getColors();
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    });

  }
  setCurrentColor(color:number){
    this.currentColor=color;
  }
  clearCurrentColor()
  {
    //let emptyColor:Color = {id:0, name:""};
    this.currentColor=0;
    this.getAllColorClass();
  }
  getCurrentColorClass(color:number){
    if(color==this.currentColor){
      return "list-group-item list-group-item-action list-group-item-primary"
    }
    return "list-group-item list-group-item-action list-group-item-light"
  }
  getAllColorClass(){
    if(!this.currentColor||this.currentColor===0){
      return "list-group-item list-group-item-action list-group-item-primary"
    }
    return "list-group-item list-group-item-action list-group-item-light"
  }

}
