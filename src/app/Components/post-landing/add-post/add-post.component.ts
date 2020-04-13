import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../post-service/post.service';
import {ApiConst} from '../../../ApiConstants/api-const';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatDialogRef} from '@angular/material';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})

export class AddPostComponent implements OnInit {
  titleControl = new FormControl('', Validators.required);
  imageControl = new FormControl('', Validators.required);
  brandControl = new FormControl('', Validators.required);
  modelControl = new FormControl('', Validators.required);
  lotControl = new FormControl('', Validators.required);
  engineControl = new FormControl('', Validators.required);
  kilometerControl = new FormControl('', Validators.required);
  usedControl = new FormControl('', Validators.required);
  priceControl = new FormControl('', Validators.required);
  locationControl = new FormControl('', Validators.required);
  contactControl = new FormControl('', Validators.required);
  contentControl = new FormControl('', Validators.required);
  transmissionControl = new FormControl('', Validators.required);
  drivetrainControl = new FormControl('', Validators.required);
  conditionControl = new FormControl('', Validators.required);
  statusControl = new FormControl('', Validators.required);
  fuelControl = new FormControl('', Validators.required);
  priceOptionControl = new FormControl('', Validators.required);
  modelYearControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  year;
  brand;
  model;
  uploadImage;
  transmission;
  drivetrain;
  fuelType;
  image;
  options =['Yes', 'No'];
  status = ['Used', 'Like New'];
  condition = ['Satisfactory', 'Good', 'Excellent'];
  fileToUpload: File = null;
  error: any;
  constructor(private formBuilder: FormBuilder,
              private postService: PostService,
              private dialog: MatDialogRef<any>) { }

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
    if(this.titleControl.valid && this.lotControl.valid && this.brandControl.valid && this.modelControl.valid
      && this.engineControl.valid && this.kilometerControl.valid && this.modelYearControl.valid && this.transmissionControl.valid
      && this.usedControl.valid && this.priceControl.valid && this.drivetrainControl.valid && this.fuelControl.valid && this.locationControl.valid
      && this.statusControl.valid && this.conditionControl.valid && this.contentControl.valid && this.priceOptionControl.valid ){
      let r = Math.random().toString(36).substring(5);
      const slug = this.modelControl.value +'-'+r;
      const formData = new FormData();
      formData.append('user', localStorage.getItem('current-active-user-id'));
      formData.append('title', this.titleControl.value);
      formData.append('slug', slug);
      formData.append('image', this.image);
      formData.append('content', this.contentControl.value);
      formData.append('location', this.locationControl.value);
      formData.append('contact', this.contactControl.value);
      formData.append('price', this.priceControl.value);
      formData.append('price_negotiable', this.priceOptionControl.value);
      formData.append('condition', this.conditionControl.value);
      formData.append('status', this.statusControl.value);
      formData.append('used_for_time', this.usedControl.value);
      formData.append('brand', this.brandControl.value);
      formData.append('model', this.modelControl.value);
      formData.append('model_year', this.modelYearControl.value);
      formData.append('transmission', this.transmissionControl.value);
      formData.append('engine_size', this.engineControl.value);
      formData.append('drivetrain', this.drivetrainControl.value);
      formData.append('fuel_type', this.fuelControl.value);
      formData.append('lot', this.lotControl.value);
      formData.append('kilometer', this.kilometerControl.value);
      const headers = {
        headers: { 'Authorization': ApiConst.JWT+ ApiConst.TOKENHEADER}
      };
      this.postService.postBlogContent(formData, ApiConst.BLOGPOSTCREATE, headers).subscribe((response)=>{
        console.log(response);
        swal.fire("Sucess!", 'Post sucessfull' , "success");
        this.dialog.close({data: 'Sucess'});
      });

    }else{
      console.log('Not Valid');
      swal.fire("Empty Fields!", 'Fields cannot be empty', "error");
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

  onSelectFile(files: FileList) {
    this.image = files.item(0);
  }
}
