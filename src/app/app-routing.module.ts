import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './Components/login/login.component';
import {AppComponent} from './app.component';
import {AuthGuard} from './Authentication/auth.guard';
import {RegisterComponent} from './Components/register/register.component';
import {PostLandingComponent} from './Components/post-landing/post-landing.component';
import {PostDetailComponent} from './Components/post-detail/post-detail.component';
import {PredictionModelComponent} from './Components/prediction-model/prediction-model.component';
import {LoaderComponent} from './Components/prediction-model/loader/loader.component';
import {CompareComponent} from './Components/compare/compare.component';
import {LocationComponent} from './Components/location/location.component';


const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'', component: PostLandingComponent},
  {path:'dashboard', component: PostLandingComponent},
  {path:'register', component: RegisterComponent},
  {path:'post-home', component: PostLandingComponent},
  {path:'post-detail', component: PostDetailComponent},
  {path:'predict', component: PredictionModelComponent},
  {path:'compare', component: CompareComponent},
  {path:'location', component: LocationComponent},

  // {path:'',  redirectTo: 'login', pathMatch: 'full' },
  // {path: '', component: AppComponent, pathMatch: 'full', canActivate:[AuthGuard]},
  // {path: 'attendance', component: AttendanceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
