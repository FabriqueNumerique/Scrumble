import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { ReglesService } from 'src/app/service/regles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Regles } from 'src/app/model/regles';
@Component({
  selector: 'app-regles-edit',
  templateUrl: './regles-edit.component.html',
  styleUrls: ['./regles-edit.component.css'],
})
export class ReglesEditComponent implements OnInit {
  _id: string = '';
  regle: any;
  form: any = FormGroup;
  constructor(
    public regelesservices: ReglesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._id = this.route.snapshot.params['postId'];
    // console.log(this.route.snapshot.params['postId']);

    this.regelesservices.find(this._id).subscribe((data: Regles) => {
      this.regle = data;
      console.log(this.regle);
    });
    this.form = new FormGroup({
      titre: new FormControl('', [Validators.required]),
      contenu: new FormControl('', Validators.required),
      img: new FormControl('', Validators.required),
      texte: new FormControl('', Validators.required),
      video: new FormControl('', Validators.required),
    });
  }

get f(){
  return this.form.controls;
}
   
submit(){
  console.log(this.form.value);
  this.regelesservices.update(this._id, this.form.value).subscribe((res:any) => {
       alert('Regles updated successfully!');
       this.router.navigateByUrl('/regles');
  })
}
}
