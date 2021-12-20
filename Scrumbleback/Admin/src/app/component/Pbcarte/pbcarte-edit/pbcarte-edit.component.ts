import { Component, OnInit } from '@angular/core';
import { PbcarteService } from '../../../service/pbcarte.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pbcarte } from '../../../model/pbcarte';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-pbcarte-edit',
  templateUrl: './pbcarte-edit.component.html',
  styleUrls: ['./pbcarte-edit.component.css']
})
export class PbcarteEditComponent implements OnInit {
  
  _id: string="";
  pbcarte:any;
  form:any= FormGroup;
  
  constructor(
    public pbcarteservice: PbcarteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // console.log("hello");

    this._id = this.route.snapshot.params['postId'];
    // console.log(this.route.snapshot.params['postId']);
    
    this.pbcarteservice.find(this._id).subscribe((data: Pbcarte)=>{
       this.pbcarte = data;
       console.log(this.pbcarte);
       
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
  this.pbcarteservice.update(this._id, this.form.value).subscribe((res:any) => {
       console.log('Post updated successfully!');
       this.router.navigateByUrl('/pbcarte');
  })
}
}
