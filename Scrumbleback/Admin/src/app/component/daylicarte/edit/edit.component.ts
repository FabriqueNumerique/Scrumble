import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Daylicarte } from 'src/app/model/daylicarte';
import { DaylicarteService } from 'src/app/service/daylicarte.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  _id: string="";
  daylicarte:any;
  form:any= FormGroup;
  constructor(
    public daylicarteservice: DaylicarteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._id = this.route.snapshot.params['postId'];
    // console.log(this.route.snapshot.params['postId']);
    
    this.daylicarteservice.find(this._id).subscribe((data: Daylicarte)=>{
       this.daylicarte = data;
       console.log(this.daylicarte);
       
  })
  this.form = new FormGroup({
    titre: new FormControl('', [Validators.required]),
    contenu: new FormControl('', Validators.required)
  });
  }
   
get f(){
  return this.form.controls;
}
   
submit(){
  console.log(this.form.value);
  this.daylicarteservice.update(this._id, this.form.value).subscribe((res:any) => {
       alert('carte mis a jour avec success!');
       this.router.navigateByUrl('/daylicarte');
  })
}
}
