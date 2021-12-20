import { Component, OnInit } from '@angular/core';
import { Userstories1 } from 'src/app/model/userstories1';
import { Userstories1Service } from 'src/app/service/userstories1.service';

@Component({
  selector: 'app-userstories1',
  templateUrl: './userstories1.component.html',
  styleUrls: ['./userstories1.component.css']
})
export class Userstories1Component implements OnInit {
  userstories: Userstories1[]=[];
  constructor(public userstoriesservice:Userstories1Service) { }

  ngOnInit(): void {
    this.userstoriesservice.getAll().subscribe((data: Userstories1[])=>{
      this.userstories = data;
      console.log(this.userstories);
    })  
  }
  deleteUserstories(_id?:string){
    if (!_id) return
    this.userstoriesservice.delete(_id).subscribe(res => {
         this.userstories= this.userstories.filter(item => item._id !== _id);
        alert('Userstories deleted successfully!');
    })
  }

}
