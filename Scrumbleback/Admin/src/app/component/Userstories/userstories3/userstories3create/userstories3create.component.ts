import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Userstories3Service } from 'src/app/service/userstories3.service';

@Component({
  selector: 'app-userstories3create',
  templateUrl: './userstories3create.component.html',
  styleUrls: ['./userstories3create.component.css']
})
export class Userstories3createComponent implements OnInit {
  form:any= FormGroup;
  constructor(public userstorieservice: Userstories3Service,
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
         this.router.navigateByUrl('/usesrtories3gestion');
    })
  }

}
