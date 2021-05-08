import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-admin',
  templateUrl: './color-admin.component.html',
  styleUrls: ['./color-admin.component.css']
})
export class ColorAdminComponent implements OnInit {

  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
  ) { }

  allColors:Color[];
  selectedColor: Color;
  allColorsDataLoaded=false
  selectedColorDataLoaded=false
  selectionForAdd:boolean =true
  selectionForEdit:boolean =false
  colorUpdateForm: FormGroup;
  colorAddForm: FormGroup;

  ngOnInit(): void {
    this.getAllColors();
    this.createAddColorForm()
  }

  selectionAdd(selection:boolean){
    this.selectionForAdd=selection;
    this.selectionForEdit=false;
    this.resetSelectedColor(false)    
  }

  selectionEdit(selection:boolean){
    this.selectionForAdd=false;
    this.selectionForEdit=selection    
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId:[this.selectedColor.colorId],
      colorName: [this.selectedColor.colorName, Validators.required]
    });
  }

  resetSelectedColor(newValue:boolean){
    this.selectedColorDataLoaded=newValue
  }

  createAddColorForm() {
    this.colorAddForm = this.formBuilder.group({
      colorName: ["", Validators.required]
    });
  }

  addColor() {
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value)
      this.colorService.addColor(colorModel).subscribe(response => {
        this.toastrService.success(response.message, 'Başarılı');
        this.colorAddForm.reset();
        this.getAllColors();
      },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
              this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama hatası');
            }
          }
        })
    }
    else {
      this.toastrService.error('Giriş yaptığınız bilgileri kontrol ediniz.', 'Dikkat');
    }
  }

  getAllColors() {
    this.colorService.getColors().subscribe(response => {
      this.allColors = response.data
      this.allColorsDataLoaded = true;
    })
  }

  getColorByColorId(id: number) {
      this.colorService.getColorByColorId(id).subscribe(response => {
      this.selectedColor = response.data
      this.selectedColorDataLoaded = true
      this.createColorUpdateForm()
    })
  }

  updateColor() {
    if (this.colorUpdateForm.valid) {
      let colorModel: Color = Object.assign({}, this.colorUpdateForm.value)
      //colorModel.colorId = this.selectedColor.colorId
      this.colorService.updateColor(colorModel).subscribe(response => {
        this.toastrService.success(response.message, 'Başarılı');
        this.colorUpdateForm.reset();
        this.getAllColors();
      },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
              this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,'Doğrulama hatası');
            }
          }
        })
    }
    else {
      this.toastrService.error('Giriş yaptığınız bilgileri kontrol ediniz.', 'Dikkat');
    }
  }

  deleteColor(id:number){
    let colorToDelete:Color
    this.colorService.getColorByColorId(id).subscribe(response=>{ colorToDelete=response.data
     this.colorService.deleteColor(colorToDelete).subscribe(response=>{
     this.toastrService.success(response.message,"Silindi")
     this.getAllColors();
   },responseError=>{
     this.toastrService.error(responseError.message)
   })
    },responseError=>{
      this.toastrService.error("Belirtilen renge ulaşılamadı.","Hata")
    })    
  }

}