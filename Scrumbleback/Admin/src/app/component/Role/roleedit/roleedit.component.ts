import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { RoleService } from 'src/app/service/role.service';
@Component({
  selector: 'app-roleedit',
  templateUrl: './roleedit.component.html',
  styleUrls: ['./roleedit.component.css']
})
export class RoleeditComponent implements OnInit {

  _id: string = '';
  role: any;
  form: any = FormGroup;

  constructor(
    public roleservices: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._id = this.route.snapshot.params['postId'];
    // console.log(this.route.snapshot.params['postId']);

    this.roleservices.find(this._id).subscribe((data: User) => {
      this.role = data;
      console.log(this.role);
    });
    this.form = new FormGroup({
      
      fullName: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
    });
  }

get f(){
  return this.form.controls;
}
   
submit(){
  console.log(this.form.value);
  this.roleservices.update(this._id, this.form.value).subscribe((res:any) => {
       alert('Roles mis a jour avec success ');
       this.router.navigateByUrl('/role');
  })
}
}
