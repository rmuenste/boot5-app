import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { VocControllerComponent } from './components/voc-controller/voc-controller.component';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'voc', component: VocControllerComponent, canActivate: [AuthGuardService]},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
