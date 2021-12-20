import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Revuecarte } from 'src/app/model/revuecarte';
import { RevuecarteService } from 'src/app/service/revuecarte.service';
@Component({
  selector: 'app-revue-carte-create',
  templateUrl: './revue-carte-create.component.html',
  styleUrls: ['./revue-carte-create.component.css']
})
export class RevueCarteCreateComponent implements OnInit {
  form:any= FormGroup;
  constructor(public pbcarteservice: RevuecarteService,
    private router: Router) {
     
     }

  ngOnInit(): void { 
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
    this.pbcarteservice.create(this.form.value).subscribe(res => {
         alert('carte created successfully!');
         this.router.navigateByUrl('/revuecarte');
    })
  }

}
