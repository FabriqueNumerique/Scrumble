import { Component, OnInit } from '@angular/core';
import { Userstories1 } from 'src/app/model/userstories1';
import { Userstories3Service } from 'src/app/service/userstories3.service';

@Component({
  selector: 'app-userstories3index',
  templateUrl: './userstories3index.component.html',
  styleUrls: ['./userstories3index.component.css']
})
export class Userstories3indexComponent implements OnInit {
  userstories: Userstories1[]=[];
  constructor(public userstoriesservice:Userstories3Service) { }

  ngOnInit(): void {
    this.userstoriesservice.getAll().subscribe((data: Userstories1[])=>{
      this.userstories = data;
      console.log(this.userstories);
    })  
  }
  delete(_id?:string){
    if (!_id) return
    this.userstoriesservice.delete(_id).subscribe(res => {
         this.userstories= this.userstories.filter(item => item._id !== _id);
        alert('Userstories deleted successfully!');
    })
  }

}
