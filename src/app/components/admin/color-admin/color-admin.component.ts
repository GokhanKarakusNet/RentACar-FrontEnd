import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private activatedRoute: ActivatedRoute
  ) { }

  allColors: Color[];
  selectedColor: Color;
  allColorsDataLoaded = false
  selectedColorDataLoaded = false
  colorUpdateForm: FormGroup;
  colorAddForm: FormGroup;

  ngOnInit(): void {
    this.getAllColors();
    this.createAddColorForm()
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorName: ["", Validators.required]
    });
  }
  createAddColorForm() {
    this.colorAddForm = this.formBuilder.group({
      colorName: ["", Validators.required]
    });
  }

  addColor() {
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value)
      this.colorService.add(colorModel).subscribe(response => {
        this.toastrService.success(response.message, 'Başarılı');
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
    this.createColorUpdateForm()
    this.colorService.getColorByColorId(id).subscribe(response => {
      this.selectedColor = response.data
      this.selectedColorDataLoaded = true
      console.log("get metodundan" + this.selectedColor.colorName)
    })
  }

  updateColor() {
    if (this.colorUpdateForm.valid) {
      let colorModel: Color = Object.assign({}, this.colorUpdateForm.value)
      colorModel.colorId = this.selectedColor.colorId
      this.colorService.updateColor(colorModel).subscribe(response => {
        this.toastrService.success(response.message, 'Başarılı');
      },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        })
    }
    else {
      this.toastrService.error(
        'Giriş yaptığınız bilgileri kontrol ediniz.', 'Dikkat');
    }
  }

  deleteColor(id: number) {
    let colorToDelete: Color
    this.colorService.getColorByColorId(id).subscribe(response => {
      colorToDelete = response.data
      this.colorService.deleteColor(id).subscribe(response => {
        this.toastrService.success(response.message, "Silindi")
      }, responseError => {
        this.toastrService.error(responseError.message)
      })
    })
  }

}