import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Pbcarte } from '../../../model/pbcarte';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { RevuecarteService } from 'src/app/service/revuecarte.service';
import { Revuecarte } from 'src/app/model/revuecarte';
@Component({
  selector: 'app-revue-carte-edit',
  templateUrl: './revue-carte-edit.component.html',
  styleUrls: ['./revue-carte-edit.component.css']
})
export class RevueCarteEditComponent implements OnInit {
  _id: string="";
  pbcarte:any;
  form:any= FormGroup;
  constructor(
    public revuecarteservice:RevuecarteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this._id = this.route.snapshot.params['postId'];
    // console.log(this.route.snapshot.params['postId']);
    
    this.revuecarteservice.find(this._id).subscribe((data: Revuecarte)=>{
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
  this.revuecarteservice.update(this._id, this.form.value).subscribe((res:any) => {
       alert('Carte mise a jour avec succés');
       this.router.navigateByUrl('/revuecarte');
  })
}

}
