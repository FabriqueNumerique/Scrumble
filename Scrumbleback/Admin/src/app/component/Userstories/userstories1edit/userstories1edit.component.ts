import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Userstories1Service } from 'src/app/service/userstories1.service';
import { Userstories1 } from 'src/app/model/userstories1';
@Component({
  selector: 'app-userstories1edit',
  templateUrl: './userstories1edit.component.html',
  styleUrls: ['./userstories1edit.component.css']
})
export class Userstories1editComponent implements OnInit {
  _id: string='';
  userstorie:any;
  form:any= FormGroup;

  constructor(  public userstories1service:Userstories1Service,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this._id = this.route.snapshot.params['postId'];
    // console.log(this.route.snapshot.params['postId']);
    
    this.userstories1service.find(this._id).subscribe((data: Userstories1)=>{
       this.userstorie = data;
       console.log(this.userstorie);
       
  })
    this.form = new FormGroup({
       id:new FormControl('', [Validators.required]),
      titre: new FormControl('', [Validators.required]),
      contenu: new FormControl('', Validators.required),
      img:new FormControl('', Validators.required),
      Dependance:new FormControl('', Validators.required ),
      dposition:new FormControl('', Validators.required),
      taille:new FormControl('', Validators.required),
      value:new FormControl('', Validators.required),
    });
  }
   
get f(){
  return this.form.controls;
}
   
submit(){
  console.log(this.form.value);
  this.userstories1service.update(this._id, this.form.value).subscribe((res:any) => {
       alert('userstories updated successfully!');
       this.router.navigateByUrl('/userstories1gestion');
  })
}

}
