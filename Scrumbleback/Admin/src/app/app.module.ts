import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './component/user/signup/signup.component';
import { SigninComponent } from './component/user/signin/signin.component';
import { AccueilComponent} from './component/accueil/accueil.component';
import {AuthGuard} from './auth/auth.guard';
import {AuthInterceptor} from './auth/auth.interceptor';
import { NavbarComponent } from './component/Menu/navbar/navbar.component';
import { FooterComponent } from './component/Menu/footer/footer.component';
import { NavbaroldComponent } from './component/Menu/navbarold/navbarold.component';
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
import { Userstories1A1Component } from './component/Userstories/userstories1-a1/userstories1-a1.component';
import { Usesrtories2indexComponent } from './component/Userstories/userstories2/usesrtories2index/usesrtories2index.component';
import { Usesrtories2createComponent } from './component/Userstories/userstories2/usesrtories2create/usesrtories2create.component';
import { Usesrtories2editComponent } from './component/Userstories/userstories2/usesrtories2edit/usesrtories2edit.component';
import { Userstories3indexComponent } from './component/Userstories/userstories3/userstories3index/userstories3index.component';
import { Userstories3createComponent } from './component/Userstories/userstories3/userstories3create/userstories3create.component';
import { Userstories3EditComponent } from './component/Userstories/userstories3/userstories3-edit/userstories3-edit.component';


// import { RoleComponent } from './component/role/role.component';
// import { RolecreateComponent } from './component/rolecreate/rolecreate.component';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    AccueilComponent, 
    NavbarComponent, 
    FooterComponent,
    NavbaroldComponent, 
    IndexComponent, 
    CreateComponent,
     PbcarteIndexComponent,
      PbcarteCreateComponent,
       PbcarteEditComponent,
        ChoixComponent,
         Userstories1Component, 
         Userstories1createComponent, 
         Userstories1editComponent,
          RevueCarteIndexComponent,
           RevueCarteCreateComponent,
            RevueCarteEditComponent,
             ReglesIndexComponent, 
             ReglesCreateComponent,
              ReglesEditComponent,
               RoleComponent,
                RoleeditComponent, 
                EditComponent,
                 WelcomeComponent,
                 Userstories1A1Component,
                 Usesrtories2indexComponent,
                 Usesrtories2createComponent,
                 Usesrtories2editComponent,
                 Userstories3indexComponent,
                 Userstories3createComponent,
                 Userstories3EditComponent
                 
 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,FormsModule,ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
