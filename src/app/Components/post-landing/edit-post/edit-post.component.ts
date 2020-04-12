import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {PostService} from '../post-service/post.service';
import {MatDialogRef} from '@angular/material';
import {ApiConst} from '../../../ApiConstants/api-const';
import swal from 'sweetalert';
import {toInteger} from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
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
  editImage;
  slug;
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
    this.setFormData();
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
  setFormData(){
    const url = localStorage.getItem('post-detail');
    if (url) {
      this.postService.getPostDetail(url).subscribe((response) => {
        if (response) {
          console.log(response);
          this.titleControl.setValue(response.title);
          this.brandControl.setValue(response.brand);
          this.modelControl.setValue(response.status);
          this.modelYearControl.setValue(toInteger(response.model_year));
          this.lotControl.setValue(response.lot);
          this.transmissionControl.setValue(response.transmission);
          this.drivetrainControl.setValue(response.drivetrain);
          this.statusControl.setValue(response.status);
          this.conditionControl.setValue(response.condition);
          this.engineControl.setValue(response.engine_size);
          this.fuelControl.setValue(response.fuel_type);
          this.kilometerControl.setValue(response.kilometer);
          this.priceControl.setValue(response.price);
          this.priceOptionControl.setValue(response.price_negotiable);
          this.locationControl.setValue(response.location);
          this.contactControl.setValue(response.contact);
          this.contentControl.setValue(response.content);
          this.usedControl.setValue(response.used_for_time);
          this.editImage = response.image;
          this.slug = response.slug;


        }
      });
    }
  }
  onSubmit() {
    if(this.titleControl.valid && this.lotControl.valid && this.brandControl.valid && this.engineControl.valid
      && this.kilometerControl.valid && this.modelYearControl.valid && this.transmissionControl.valid
      && this.usedControl.valid && this.priceControl.valid && this.drivetrainControl.valid
      && this.fuelControl.valid && this.locationControl.valid && this.statusControl.valid && this.conditionControl.valid
      && this.contentControl.valid && this.priceOptionControl.valid ){
      const formData = new FormData();
      // if(!(this.imageControl.valid || this.imageControl.value)){
      //   formData.append('image', this.image);
      // }else{
      //   formData.append('image', this.imageControl.value);
      // }
      formData.append('user', localStorage.getItem('current-active-user-id'));

      formData.append('title', this.titleControl.value);
      formData.append('slug', this.slug);
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
      const signatureExp = 'Signature has expired.';
      this.postService.editBlogContent(formData, this.slug, headers)
        .subscribe((response)=>{
          console.log(response);
          swal("Sucess!", 'Successfully Updated' , "success");
          setTimeout(()=>{
            window.location.reload();
          },1000);
        },error => {
        if (error.error.detail === signatureExp) {
          swal('Login!', 'Signature has expired. Please log in again', 'warning');
        } else {
          console.log(error);
          swal('Server Error!', 'Cannot Update', 'warning');
        }
      });

    }else{
      console.log('Not Valid');
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
      })
  }
  onSelectFile(files: FileList) {
    this.image = files.item(0);
  }
}
