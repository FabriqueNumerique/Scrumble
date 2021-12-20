import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { DaylicarteService } from 'src/app/service/daylicarte.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form:any= FormGroup;
  constructor(public dayliservice: DaylicarteService,
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
    this.dayliservice.create(this.form.value).subscribe(res => {
         alert('carte created successfully!');
         this.router.navigateByUrl('/dayli');
    })
  }
}
