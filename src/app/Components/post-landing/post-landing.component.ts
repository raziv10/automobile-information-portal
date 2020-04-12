import { Component, OnInit } from '@angular/core';
import {PostService} from './post-service/post.service';
import {ApiConst} from '../../ApiConstants/api-const';
import {BaseService} from '../_common-services/base-service/base.service';
import {MatDialog} from '@angular/material';
import {AddPostComponent} from './add-post/add-post.component';
import {Router} from '@angular/router';
import swal from 'sweetalert';



@Component({
  selector: 'app-post-landing',
  templateUrl: './post-landing.component.html',
  styleUrls: ['./post-landing.component.css']
})

export class PostLandingComponent implements OnInit {
  imageToShow: any;
  isImageLoading: boolean;
  data;
  noData;
  nextPage;
  prevPage;
  loader;
  disabled;
  disablePrev;

  constructor(private postService: PostService,
              private baseService: BaseService,
              private dialog: MatDialog,
              private route: Router) { }

  ngOnInit() {
    this.loader = true;
    this.inOnIt(ApiConst.SERVER_URL+ ApiConst.BLOGPOSTLIST);
  }
  inOnIt(url){
    localStorage.removeItem('post-detail');
    this.postService.getBlogPostData(url).subscribe((data)=>{

      if(data){
        this.loader = false;
        console.log(data);
        this.data = data.results;

        this.nextPage = data.next;
        this.prevPage = data.previous;
      }else{
        this.loader = true;
      }

    }, error => {
      this.loader = true;
      setTimeout(()=>{
        this.noData = true;
        this.loader = false;
      },3000);

    });
  }
  add(){
    const headers = {
      headers: { 'Authorization': ApiConst.JWT+ApiConst.TOKENHEADER}
    };
    const lookup = 'Error decoding signature.';
    const nextLookUp = 'Authentication credentials were not provided.';
    const signatureExp = 'Signature has expired.';
    this.postService.checkPostAddStatus(ApiConst.SERVER_URL + ApiConst.BLOGPOSTCREATE, headers)
      .subscribe((response) =>{},error => {
        console.log(error.error.detail);
        if(error.error.detail === signatureExp || error.error.detail === nextLookUp ){
          swal("Login!", "Signature has expired. Please log in again", "warning");
        }else{
          if(error.error.detail !== lookup ){
            this.dialog.open(AddPostComponent,{
              width:'750px',
              height:'600px'
            }).afterClosed().subscribe((result)=>{
              console.log(result);
              if(result){
                window.location.reload();
              }
            });
          } else{
            swal("Login!", "You must be logged in to Post!", "warning");
          }
        }

      });
  }

  nextPost() {
    if(this.nextPage){
      this.disabled=false;
      console.log(this.nextPage);
      this.inOnIt(this.nextPage);
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      console.log('Next page');
      document.getElementById("content").scrollIntoView({
        behavior: 'smooth'
      });

    }else{
      this.disabled = true;

    }
  }

  previousPost() {
    if(this.prevPage){
      this.inOnIt(this.prevPage);
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      document.getElementById("content").scrollIntoView({
        behavior: 'smooth'
      });
    } else{
      this.disabled=false;
      this.disablePrev = true;
    }
  }

  viewPost(index: number) {
    console.log(index);
    const url = this.data[index].url;
    this.postService.setPostDetailUrl(url);
    localStorage.setItem('post-detail',url);
    this.route.navigate(['/post-detail']);
  }

  logout() {
    swal("Logout Successful", "", "success");
    localStorage.removeItem('current-active-user');
    localStorage.removeItem('current-active-user-id');
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
    setTimeout(()=>{

      window.location.reload();
    },2000);
  }
}
