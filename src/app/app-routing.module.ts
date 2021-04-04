import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth-guard.service';
import { LoginComponent } from './components/users/login/login.component';
import { NoAuthGuard } from "./no-auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/hospitals',
    pathMatch: 'full',
  },
  {
    path: 'home/:sectionName',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
