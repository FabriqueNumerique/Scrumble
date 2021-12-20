import { Component, OnInit } from '@angular/core';
import { Revuecarte } from 'src/app/model/revuecarte';
import { RevuecarteService } from 'src/app/service/revuecarte.service';

@Component({
  selector: 'app-revue-carte-index',
  templateUrl: './revue-carte-index.component.html',
  styleUrls: ['./revue-carte-index.component.css']
})
export class RevueCarteIndexComponent implements OnInit {
cartes: Revuecarte[] = [];
  constructor(public carteservice: RevuecarteService) { }

  ngOnInit(): void {
    this.carteservice.getAll().subscribe((data: Revuecarte[])=>{
      this.cartes = data;
      console.log(this.cartes);
    })  
  }
  deleteCard(_id?:string){
    if (!_id) return
    this.carteservice.delete(_id).subscribe(res => {
         this.cartes= this.cartes.filter(item => item._id !== _id);
         console.log('Pbcartes deleted successfully!');
    })
  }

}
