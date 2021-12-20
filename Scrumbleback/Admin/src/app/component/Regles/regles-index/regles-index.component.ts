import { Component, OnInit } from '@angular/core';
import { Regles } from 'src/app/model/regles';
import { ReglesService } from 'src/app/service/regles.service';

@Component({
  selector: 'app-regles-index',
  templateUrl: './regles-index.component.html',
  styleUrls: ['./regles-index.component.css']
})
export class ReglesIndexComponent implements OnInit {
  regles: Regles[]=[];
  constructor(public reglesservice: ReglesService) { }

  ngOnInit(): void {
    this.reglesservice.getAll().subscribe((data: Regles[])=>{
      this.regles = data;
      console.log(this.regles);
    })  
  }
  deletePost(_id?:string){
    if (!_id) return
    this.reglesservice.delete(_id).subscribe(res => {
         this.regles= this.regles.filter(item => item._id !== _id);
         console.log('regles deleted successfully!');
    })
  }

}
