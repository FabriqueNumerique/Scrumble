import { Component, OnInit } from '@angular/core';
import { Userstories1 } from 'src/app/model/userstories1';
import { Usesrtories2Service } from 'src/app/service/usesrtories2.service';

@Component({
  selector: 'app-usesrtories2index',
  templateUrl: './usesrtories2index.component.html',
  styleUrls: ['./usesrtories2index.component.css']
})
export class Usesrtories2indexComponent implements OnInit {
  userstories: Userstories1[]=[];
  constructor(public userstoriesservice:Usesrtories2Service) { }

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
