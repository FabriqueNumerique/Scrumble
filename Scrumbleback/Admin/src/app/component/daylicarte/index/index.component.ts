import { Component, OnInit } from '@angular/core';
import { DaylicarteService} from '../../../service/daylicarte.service';
import { NgForm } from '@angular/forms';
import { Daylicarte } from 'src/app/model/daylicarte';
declare var M:any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  cartes: Daylicarte[] = [];
  constructor(public dayliservice:DaylicarteService) { }

  ngOnInit(): void {
    this.dayliservice.getAll().subscribe((data: Daylicarte[])=>{
      this.cartes = data;
      console.log(this.cartes);
    })  
    // this.resetForm();
    // this.refreshdayliList();
  }
  deletePost(_id?:string){
    if (!_id) return
    this.dayliservice.delete(_id).subscribe(res => {
         this.cartes= this.cartes.filter(item => item._id !== _id);
         console.log('Daylicartes deleted successfully!');
    })
  }

  // resetForm(form?: NgForm) {
  //   if (form)
  //     form.reset();
  //   this.dayliservice.selectedDaylicarte = {
  //     _id: "",
  //     titre: "",
  //     contenu: ""
  //   }
  // }
  // onSubmit(form: NgForm) {
  //   if (form.value._id == "") {
  //     this.dayliservice.postdayli(form.value).subscribe((res:any) => {
  //       this.resetForm(form);
  //       this.refreshdayliList();
  //       M.toast({ html: 'Saved successfully', classes: 'rounded' });
  //     });
  //   }
  //   else {
  //     this.dayliservice.putdayli(form.value).subscribe((res:any) => {
  //       console.log(res);
  //       console.log(form.value);
        
  //       this.resetForm(form);
  //       this.refreshdayliList();
  //       M.toast({ html: 'Updated successfully', classes: 'rounded' });
  //     });
  //   }
  // }

  // refreshdayliList() {
  //   this.dayliservice.getdayliList().subscribe((res) => {
  //     this.dayliservice.daylicarte = res as Daylicarte[];
  //   });
  // }

  // onEdit(dayli: Daylicarte) {
  //   this.dayliservice.selectedDaylicarte = dayli;
  //   console.log(dayli);
  //   console.log(this.dayliservice.selectedDaylicarte);
    
    
  // }

  // onDelete(_id: any, form: NgForm) {
  //   if (confirm('etes vous sur de vouloir supprimer  ?') == true) {
  //     this.dayliservice.deletedayli(_id).subscribe((res:any) => {
  //       this.refreshdayliList();
  //       this.resetForm(form);
  //       M.toast({ html: 'Deleted successfully', classes: 'rounded' });
  //     });
  //   }
  // }
}
