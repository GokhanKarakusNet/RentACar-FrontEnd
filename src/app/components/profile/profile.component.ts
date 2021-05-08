import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnChanges {

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  user:User;
  userId:number;
  constructor( private toastrService:ToastrService,
    private router:Router,
    private userService:UserService,
    public c:CarService,
    public authService:AuthService,
    public dialog: MatDialog) { }


  ngOnChanges(changes: SimpleChanges): void {
    this.getUser();

  }

  ngOnInit(): void {
    
  }

  getUser()
  {
    this.userService.getUser(this.authService.getCurrentUser().nameid).subscribe(response => {
      this.user = response.data;
    })
  }



  isLogged()
  {
    return this.authService.isAuthenticated();
  }

  logOut()
  {
    this.router.navigate(['login']);
    this.toastrService.info("Çıkış Yapıldı");
    return this.authService.logOut();
  }

}
