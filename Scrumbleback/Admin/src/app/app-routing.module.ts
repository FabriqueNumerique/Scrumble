import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './component/accueil/accueil.component';
import { SigninComponent } from './component/user/signin/signin.component';
import { SignupComponent } from './component/user/signup/signup.component';
import { UserComponent } from './component/user/user.component';
import {AuthGuard} from './auth/auth.guard';
import { IndexComponent } from './component/daylicarte/index/index.component';
import { CreateComponent } from './component/daylicarte/create/create.component';
import { PbcarteIndexComponent } from './component/Pbcarte/pbcarte-index/pbcarte-index.component';
import { PbcarteCreateComponent } from './component/Pbcarte/pbcarte-create/pbcarte-create.component';
import { PbcarteEditComponent } from './component/Pbcarte/pbcarte-edit/pbcarte-edit.component';
import { ChoixComponent } from './component/Userstories/choix/choix.component';
import { Userstories1Component } from './component/Userstories/userstories1/userstories1.component';
import { Userstories1createComponent } from './component/Userstories/userstories1create/userstories1create.component';
import { Userstories1editComponent } from './component/Userstories/userstories1edit/userstories1edit.component';
import { RevueCarteIndexComponent } from './component/RevueCarte/revue-carte-index/revue-carte-index.component';
import { RevueCarteCreateComponent } from './component/RevueCarte/revue-carte-create/revue-carte-create.component';
import { RevueCarteEditComponent } from './component/RevueCarte/revue-carte-edit/revue-carte-edit.component';
import { ReglesIndexComponent } from './component/Regles/regles-index/regles-index.component';
import { ReglesCreateComponent } from './component/Regles/regles-create/regles-create.component';
import { ReglesEditComponent } from './component/Regles/regles-edit/regles-edit.component';
import { RoleComponent } from './component/Role/role/role.component';
import { RoleeditComponent } from './component/Role/roleedit/roleedit.component';
import { EditComponent } from './component/daylicarte/edit/edit.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { Usesrtories2indexComponent } from './component/Userstories/userstories2/usesrtories2index/usesrtories2index.component';
import { Usesrtories2createComponent } from './component/Userstories/userstories2/usesrtories2create/usesrtories2create.component';
import { Usesrtories2editComponent } from './component/Userstories/userstories2/usesrtories2edit/usesrtories2edit.component';
import { Userstories3indexComponent } from './component/Userstories/userstories3/userstories3index/userstories3index.component';
import { Userstories3createComponent } from './component/Userstories/userstories3/userstories3create/userstories3create.component';
import { Userstories3EditComponent } from './component/Userstories/userstories3/userstories3-edit/userstories3-edit.component';
const routes: Routes = [
  {path:'',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'welcome',component: WelcomeComponent,canActivate:[AuthGuard]},
  {path:'accueil',component:AccueilComponent},
  {path:'daylicarte',component:IndexComponent},
  {path:'daylicarte/:_id/edit',component:EditComponent},
  {path:'daylicartecreate',component:CreateComponent},
  {path:'pbcarte',component:PbcarteIndexComponent},
  {path:'pbcartecreate',component:PbcarteCreateComponent},
  {path:'pbcarte/:_id/edit',component:PbcarteEditComponent},
  {path:'revuecarte',component:RevueCarteIndexComponent},
  {path:'revuecartecreate',component:RevueCarteCreateComponent},
  {path:'revuecarte/:_id/edit',component:RevueCarteEditComponent},
  {path:'regles',component:ReglesIndexComponent},
  {path:'reglecreate',component:ReglesCreateComponent},
  {path:'regles/:_id/edit',component:ReglesEditComponent},
  {path:'role',component:RoleComponent},
  {path:'role/:_id/edit',component:RoleeditComponent},
  {path:'choix',component:ChoixComponent},
  {path:'userstories1gestion',component:Userstories1Component},
  {path:'userstories1create',component:Userstories1createComponent},
  {path:'userstories1gestion/:id/edit',component:Userstories1editComponent},
  {path:'usesrtories2gestion',component:Usesrtories2indexComponent},
  {path:'usesrtories2create',component:Usesrtories2createComponent},
  {path:'usesrtories2gestion/:id/edit',component:Usesrtories2editComponent},
  {path:'usesrtories3gestion',component:Userstories3indexComponent},
  {path:'usesrtories3create',component:Userstories3createComponent},
  {path:'usesrtories3gestion/:id/edit',component:Userstories3EditComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
