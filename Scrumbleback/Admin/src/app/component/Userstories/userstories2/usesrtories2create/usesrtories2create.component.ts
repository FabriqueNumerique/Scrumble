import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usesrtories2Service } from 'src/app/service/usesrtories2.service';

@Component({
  selector: 'app-usesrtories2create',
  templateUrl: './usesrtories2create.component.html',
  styleUrls: ['./usesrtories2create.component.css']
})
export class Usesrtories2createComponent implements OnInit {
  form:any= FormGroup;
  constructor(public userstorieservice: Usesrtories2Service,
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
         this.router.navigateByUrl('/usesrtories2gestion');
    })
  }

}
