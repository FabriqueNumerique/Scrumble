import { Component, OnInit } from '@angular/core';
import { PbcarteService } from 'src/app/service/pbcarte.service';
import {Pbcarte} from '../../../model/pbcarte'
@Component({
  selector: 'app-pbcarte-index',
  templateUrl: './pbcarte-index.component.html',
  styleUrls: ['./pbcarte-index.component.css']
})
export class PbcarteIndexComponent implements OnInit {
  cartes: Pbcarte[] = [];
  constructor(public carteservice: PbcarteService) { }

  ngOnInit(): void {
    this.carteservice.getAll().subscribe((data: Pbcarte[])=>{
      this.cartes = data;
      console.log(this.cartes);
    })  
  }
  deletePost(_id?:string){
    if (!_id) return
    this.carteservice.delete(_id).subscribe(res => {
         this.cartes= this.cartes.filter(item => item._id !== _id);
        alert('Pbcartes deleted successfully!');
    })
  }

}
