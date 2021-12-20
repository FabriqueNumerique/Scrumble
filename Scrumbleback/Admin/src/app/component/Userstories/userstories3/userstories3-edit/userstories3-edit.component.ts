import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Userstories1 } from 'src/app/model/userstories1';
import { Userstories3Service } from 'src/app/service/userstories3.service';

@Component({
  selector: 'app-userstories3-edit',
  templateUrl: './userstories3-edit.component.html',
  styleUrls: ['./userstories3-edit.component.css']
})
export class Userstories3EditComponent implements OnInit {

  _id: string='';
  userstorie:any;
  form:any= FormGroup;

  constructor(  public userstories3service:Userstories3Service,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this._id = this.route.snapshot.params['postId'];
    // console.log(this.route.snapshot.params['postId']);
    
    this.userstories3service.find(this._id).subscribe((data: Userstories1)=>{
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
  this.userstories3service.update(this._id, this.form.value).subscribe((res:any) => {
       alert('userstories updated successfully!');
       this.router.navigateByUrl('/usesrtories3gestion');
  })
}
}
