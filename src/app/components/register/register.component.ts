import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createRegisterForm()
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      firstName:["", Validators.required],
      lastName:["", Validators.required]
    })
  }

  register() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value)
      this.authService.register(registerModel).subscribe(response => {
        this.toastrService.info("Başarıyla Kayıt Oldunuz")
        console.log(response)
        this.router.navigate(["/login"]);
      }, responseError => {
        if (responseError.error.ValidationErrors.length > 0) {
          for (
            let i = 0;
            i < responseError.error.ValidationErrors.length;
            i++
          ) {
            this.toastrService.error(
              responseError.error.ValidationErrors[i].ErrorMessage,
              'Doğrulama hatası'
            );
          }
        }
        console.log(responseError)
      })
    }
  }

}
