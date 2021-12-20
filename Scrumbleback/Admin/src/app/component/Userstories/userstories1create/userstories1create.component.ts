import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Userstories1Service } from 'src/app/service/userstories1.service';
@Component({
  selector: 'app-userstories1create',
  templateUrl: './userstories1create.component.html',
  styleUrls: ['./userstories1create.component.css']
})
export class Userstories1createComponent implements OnInit {
  form:any= FormGroup;
  constructor(public userstorieservice: Userstories1Service,
    private router: Router) { }

  ngOnInit(): void {
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
    this.userstorieservice.create(this.form.value).subscribe((res:any) => {
         alert('carte created successfully!');
         this.router.navigateByUrl('/userstories1gestion');
    })
  }

}
