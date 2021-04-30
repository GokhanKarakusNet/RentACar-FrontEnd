import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorAddForm:FormGroup;
  constructor(private FormBuilder:FormBuilder,
    private colorService:ColorService,
    private toastrService:ToastrService) { }


  ngOnInit(): void {
    this.createColorAddForm();
  }
  createColorAddForm()
  {
    this.colorAddForm = this.FormBuilder.group({
      colorName: ["",Validators.required]
    })
  }
  add(){
    if(this.colorAddForm.valid)
    {
      let colorModel = Object.assign({},this.colorAddForm.value);
      console.log(colorModel)
      this.colorService.add(colorModel).subscribe(response => {
        this.toastrService.success(response.message,"Başarılı");
      },responseError => {
        console.log(responseError)
        if (responseError.error.ValidationErrors.length > 0) {
          for(let i = 0; i < responseError.error.ValidationErrors.length; i++)
          {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama Hatası")
          }
        }
       })
    }
    else
    {
      this.toastrService.error("Formunuz Eksik ya da Hatalı","Dikkat");
    }
  }

}