import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ReglesService } from 'src/app/service/regles.service';
@Component({
  selector: 'app-regles-create',
  templateUrl: './regles-create.component.html',
  styleUrls: ['./regles-create.component.css']
})
export class ReglesCreateComponent implements OnInit {
  form:any= FormGroup;
  constructor(public reglesservice:ReglesService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      titre: new FormControl('', [Validators.required]),
      contenu: new FormControl('', Validators.required),
      img:new FormControl('', Validators.required),
      texte:new FormControl('', Validators.required),
      video: new FormControl('', Validators.required),

    });
  }
  get f(){
    return this.form.controls;
  }
    
  submit(){
    console.log(this.form.value);
    this.reglesservice.create(this.form.value).subscribe(res => {
         alert('carte created successfully!');
         this.router.navigateByUrl('/regles');
    })
  }

}
