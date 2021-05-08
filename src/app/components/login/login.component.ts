import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService:LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createLoginForm()
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  login(){    
    if(this.loginForm.valid){
      let loginModel = Object.assign({},this.loginForm.value)
      this.authService.login(loginModel);
    }
  }

}