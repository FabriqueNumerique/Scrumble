import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

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

}
