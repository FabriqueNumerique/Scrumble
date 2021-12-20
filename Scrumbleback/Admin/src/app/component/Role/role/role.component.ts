import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
 role: User[]=[];
  constructor(public roleservice:RoleService) { }

  ngOnInit(): void {
    this.roleservice.getAll().subscribe((data: User[])=>{
      this.role = data;
      console.log(this.role);
    })  
  }
  deletePost(_id?:string){
    if (!_id) return
    this.roleservice.delete(_id).subscribe(res => {
         this.role= this.role.filter(item => item._id !== _id);
         alert('Utilisateur supprimé avec succés!');
    })
  }
}
