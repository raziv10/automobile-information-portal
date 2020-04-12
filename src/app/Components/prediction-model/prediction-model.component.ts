import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {PostService} from '../post-landing/post-service/post.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ApiConst} from '../../ApiConstants/api-const';
import swal from 'sweetalert';
import * as $ from 'jquery';
import {AddPostComponent} from '../post-landing/add-post/add-post.component';
import {LoaderComponent} from './loader/loader.component';
import {BaseService} from '../_common-services/base-service/base.service';

@Component({
  selector: 'app-prediction-model',
  templateUrl: './prediction-model.component.html',
  styleUrls: ['./prediction-model.component.css']
})
export class PredictionModelComponent implements OnInit {

  brandControl = new FormControl('', Validators.required);
  modelControl = new FormControl('', Validators.required);
  lotControl = new FormControl('', Validators.required);
  engineControl = new FormControl('', Validators.required);
  kilometerControl = new FormControl('', Validators.required);
  transmissionControl = new FormControl('', Validators.required);
  drivetrainControl = new FormControl('', Validators.required);
  fuelControl = new FormControl('', Validators.required);
  modelYearControl = new FormControl('', Validators.required);
  year;
  brand;
  model;
  transmission;
  drivetrain;
  fuelType;
  error: any;
  constructor(private formBuilder: FormBuilder,
              private baseService: BaseService,
              private postService: PostService,
              private dialog: MatDialog,
              ) { }

  ngOnInit() {
    this.inOnInit();
  }
  inOnInit(){
    this.fetchYear();
    this.fetchTransmission();
    this.fetchDrivetrain();
    this.fetchFuelType();
    this.fetchBrandList();
  }
  fetchYear(){
    this.year = this.postService.getYear();
  }
  fetchTransmission(){
    this.transmission = this.postService.getTransmission();
  }
  fetchDrivetrain(){
    this.drivetrain = this.postService.getDrivetrain();
  }
  fetchFuelType(){
    this.fuelType = this.postService.getFuelType();
  }
  fetchBrandList(){
    this.postService.getBlogPostData(ApiConst.SERVER_URL+ ApiConst.BRANDLIST)
      .subscribe((response)=>{
        this.brand = response.results;
      },error => {
        this.brand = ['No data'];
      });

  }

  onSubmit() {
    if(this.lotControl.valid && this.brandControl.valid && this.modelControl.valid
      && this.engineControl.valid && this.kilometerControl.valid && this.modelYearControl.valid
      && this.transmissionControl.valid && this.drivetrainControl.valid && this.fuelControl.valid){
      const formData = new FormData();
      formData.append('brand', this.brandControl.value);
      formData.append('model', this.modelControl.value);
      formData.append('model_year', this.modelYearControl.value);
      formData.append('transmission', this.transmissionControl.value);
      formData.append('engine_size', this.engineControl.value);
      formData.append('drivetrain', this.drivetrainControl.value);
      formData.append('fuel_type', this.fuelControl.value);
      formData.append('lot', this.lotControl.value);
      formData.append('kilometer', this.kilometerControl.value);
      this.dialog.open(LoaderComponent,{
        width:'700px',
        height:'480px',
        panelClass: ['myapp-no-padding-dialog']

      }).afterClosed().subscribe((response)=>{
        if(response !== undefined){
          this.baseService.hitPredictionModelApi(formData, ApiConst.PREDICTION)
            .subscribe((data)=>{
              console.log(data);
              swal("Sucess!", data , "success");
            });
        }
      });


    }else{
      swal("Empty Fields!", 'Fields cannot be empty', "error");
    }
  }

  listenBrandChange($event: Event) {
    console.log($event);
    const modelArray = [];
    this.postService.getModelPerBrandList(ApiConst.SERVER_URL+ApiConst.MODELLIST,$event)
      .subscribe((response)=>{
        const data = Object.keys(response).map(key => (modelArray.push(response[key])));
        const flatArray = Array.prototype.concat.apply([],modelArray);
        this.model = flatArray;
      },error => {
        this.model = ['No data'];
      });
  }


}
