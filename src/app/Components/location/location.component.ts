import { Component, OnInit } from '@angular/core';
import {BaseService} from '../_common-services/base-service/base.service';
import {toInteger} from '@ng-bootstrap/ng-bootstrap/util/util';
import {MatDialog} from '@angular/material';
import {AddPostComponent} from '../post-landing/add-post/add-post.component';
import {MapComponent} from './map/map.component';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  data;
  searchTerm: any;
  ratings;
  heartIcons = {
    empty: '../assets/',
    half: 'src/assets/images/star.svg',
    full: '../assets/heart-full.svg',
  }
  constructor(private service: BaseService,
              private dialog: MatDialog) { }

  ngOnInit() {
  this.getLocationData();


  }
getLocationData(){
    this.service.getLocation()
      .subscribe((response)=>{
      console.log(response);
      this.data = response;
      const mapped = Object.keys(response).map(key => ({type: key, value: response[key]}));
      console.log(mapped);
    });
}
  calculateRating(stars,index) {

    // @ts-ignore
    this.ratings = Array(toInteger(stars)).fill().map((x, i) => i);
  }

  openMapDialog(latitude:string, longitude:string, company:string) {
    this.service.setMapDetails(latitude,longitude,company);
    this.dialog.open(MapComponent,{
      width:'90vw',
      height:'580px',
      maxWidth: '90vw',
      panelClass: ['map-no-padding-dialog']
    });
  }
}
