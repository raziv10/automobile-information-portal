import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginSecurity} from './Interceptor/LoginSecurity';
import {Interceptor} from './Interceptor/interceptor';
import {AuthRequestOptions} from './Authentication/RequestHandler/authrequestoptions';
import {RequestOptions} from '@angular/http';
import {AuthErrorHandler} from './Authentication/ErrorHandler/AuthErrorHandler';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule, MatDatepickerModule, MatDialogModule, MatSelectModule} from '@angular/material';
import { RegisterComponent } from './Components/register/register.component';
import { PostLandingComponent } from './Components/post-landing/post-landing.component';
import { AddPostComponent } from './Components/post-landing/add-post/add-post.component';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { PostDetailComponent } from './Components/post-detail/post-detail.component';
import { PredictionModelComponent } from './Components/prediction-model/prediction-model.component';
import { LoaderComponent } from './Components/prediction-model/loader/loader.component';
import { EditPostComponent } from './Components/post-landing/edit-post/edit-post.component';
import { CompareComponent } from './Components/compare/compare.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { LocationComponent } from './Components/location/location.component';
import { NgxStarsModule } from 'ngx-stars';
import {LocationFilterPipe} from './Components/location/location-filter.pipe';
import { MapComponent } from './Components/location/map/map.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PostLandingComponent,
    AddPostComponent,
    NavigationComponent,
    PostDetailComponent,
    PredictionModelComponent,
    LoaderComponent,
    EditPostComponent,
    CompareComponent,
    LocationComponent,
    LocationFilterPipe,
    MapComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    NgbModule.forRoot(),
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    DragDropModule,
    NgxStarsModule,

  ],
  providers: [
    {
      provide: RequestOptions,
      useClass: AuthRequestOptions
    },
    {
      provide: ErrorHandler,
      useClass: AuthErrorHandler
    },


  ],
  bootstrap: [AppComponent],
  entryComponents: [AddPostComponent, LoaderComponent, EditPostComponent, MapComponent],

})
export class AppModule { }
