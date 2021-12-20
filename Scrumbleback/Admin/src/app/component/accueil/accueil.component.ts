import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  constructor(private userService: UserService,private router : Router) { }
  userDetails:any;
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (res:any)=>{
        this.userDetails=res['user'];
      },
      err=>{ console.log(err)}
    )
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['']);
  }

}
