import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/users/login/login.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { RightMenuComponent } from './components/right-menu/right-menu.component';
import { MainListComponent } from './components/main-list/main-list.component';
import { HospitalsIndexComponent } from './components/hospitals/hospitals-index/hospitals-index.component';
import { DoctorsIndexComponent } from './components/doctors/doctors-index/doctors-index.component';
import { PatientsIndexComponent } from './components/patients/patients-index/patients-index.component';
import { SpecialtiesIndexComponent } from './components/specialties/specialties-index/specialties-index.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RightMenuComponent,
    MainListComponent,
    HospitalsIndexComponent,
    DoctorsIndexComponent,
    PatientsIndexComponent,
    SpecialtiesIndexComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
