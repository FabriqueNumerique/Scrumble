import { Component, OnInit } from '@angular/core';
import { PbcarteService } from '../../../service/pbcarte.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-pbcarte-create',
  templateUrl: './pbcarte-create.component.html',
  styleUrls: ['./pbcarte-create.component.css']
})
export class PbcarteCreateComponent implements OnInit {
  form:any= FormGroup;
  constructor(public pbcarteservice: PbcarteService,
    private router: Router) { }

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
         this.router.navigateByUrl('/pbcarte');
    })
  }

}
