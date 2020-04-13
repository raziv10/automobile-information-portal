import {Component, OnInit} from '@angular/core';
import {PostService} from '../post-landing/post-service/post.service';
import {Router} from '@angular/router';
import {ApiConst} from '../../ApiConstants/api-const';
import {HttpParams} from '@angular/common/http';
import swal from 'sweetalert2';
import {toInteger} from '@ng-bootstrap/ng-bootstrap/util/util';
import {AddPostComponent} from '../post-landing/add-post/add-post.component';
import {MatDialog} from '@angular/material';
import {EditPostComponent} from '../post-landing/edit-post/edit-post.component';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  data = {};
  user = {};
  comments = [];
  childComments = [];
  checkComment;
  commentContent;
  commentReplyContent;
  replyId;
  url;
  postedDate;
  lastActive;
  isOwner: boolean;
  slug;
  notification: any;

  constructor(private postService: PostService,
              private route: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.checkUserObjectStatus();
    this.inOnInit();


    setTimeout(()=>{
      this.notification = false;
    },4500);
  }

  inOnInit() {
    const url = localStorage.getItem('post-detail');
    if (url) {
      this.postService.getPostDetail(url).subscribe((response) => {
        if (response) {
          this.data = response;
          this.user = response.user;
          this.comments = response.comments;

          // console.log(this.data);
          console.log(response.slug);
          this.slug = response.slug;
          this.checkComment = response.comments.length;
          this.getPostTime(response.publish_date);
          this.getPostTime(response.user.last_login);
          this.findCommentReplies();
        }
      });
    } else {
      this.route.navigate(['\dashboard']);
    }
    console.log(localStorage.getItem('post-detail'));
  }
  findCommentReplies() {
    this.comments.map((item) => {
      if (item.reply_count > 0) {
        this.fetchChildComment(item.id);
      }
    });
  }

  fetchChildComment(id) {
    console.log(id);
    this.postService.getCommentList(ApiConst.BASE_URL + ApiConst.COMMENTLIST + id + '/').subscribe((response) => {
      this.childComments = response.replies;
    });
  }

  getPostTime(data) {
    const date = new Date(data.toString().split('T')[0]);
    const month = date.toLocaleString('default', {month: 'long'});
    const day = date.getDay();
    const year = date.getFullYear();
    this.postedDate = month + ' ' + day + ', ' + year;
    this.lastActive = month + ' ' + day + ', ' + year;

  }

  postComment(slug: string) {
    console.log(this.childComments);
    // http://127.0.0.1:8000/comments/create/?slug=Ecosport-uu7r79ul&type=blogpost&parent_id=1
    const headers = {
      headers: {'Authorization': ApiConst.JWT + ApiConst.TOKENHEADER}
    };
    const lookup = 'Authentication credentials were not provided.';
    const signatureExp = 'Signature has expired.';
    const formData = new FormData();
    formData.append('content', this.commentContent);
    if (this.commentContent !== undefined && this.commentContent !== '') {
      this.postService.postCommentContent(formData, '?' + 'slug=' + slug + '&' + 'type=blogpost', headers)
        .subscribe((response) => {
          console.log(response);
          window.location.reload();
        }, error => {
          if (error.error.detail === signatureExp) {
            swal.fire('Login!', 'Signature has expired. Please log in again', 'warning');
          } else {
            console.log(error);
            swal.fire('Login!', 'You must login to comment!', 'warning');
          }
        });
    } else {
      swal.fire('Comment', 'Please include a comment', 'info');
    }

  }

  replyComment(id: any) {
    console.log(id);
    this.replyId = id;
    console.log(this.comments);
    console.log(this.childComments);
  }

  postChildComment(slug: string, id: any) {
    console.log(this.childComments);
    const headers = {
      headers: {'Authorization': ApiConst.JWT + ApiConst.TOKENHEADER}
    };
    const signatureExp = 'Signature has expired.';
    const parent_id = id;
    console.log(slug);
    const formData = new FormData();
    if (this.commentReplyContent !== undefined && this.commentReplyContent !== '') {
      formData.append('content', this.commentReplyContent);
      console.log(parent_id, this.commentReplyContent);
      this.postService.postCommentContent(formData, '?' + 'slug=' + slug + '&' + 'type=blogpost' + '&' + 'parent_id=' + parent_id, headers)
        .subscribe((response) => {
          console.log(response);
          this.commentReplyContent = '';
          this.replyId = 0;
          window.location.reload();
        }, error => {
          if (error.error.detail === signatureExp) {
            swal.fire('Login!', 'Signature has expired. Please log in again', 'warning');
          } else {
            console.log(error);
            swal.fire('Login!', 'You must login to comment!', 'warning');
          }
        });
    } else {
      swal.fire('Comment', 'Please include a comment', 'info');
    }
  }

// Check if the user is the owner of the post.
// If the user is the owner edit button should be displayed and vise versa for the opposite case.
  checkUserObjectStatus() {
    const url = localStorage.getItem('post-detail');
    const currentLoggedInUserId = localStorage.getItem('current-active-user-id');
    let slug;
    let user;
    if (url) {
      this.postService.getPostDetail(url).subscribe((response) => {
        if (response) {
          slug = response.slug;
          this.postService.checkOwnerRequest(slug)
            .subscribe((data) => {
              console.log(data.user);
              user = data.user;
              console.log(user, toInteger(currentLoggedInUserId));
              if (user === toInteger(currentLoggedInUserId)) {
                console.log('User-Obejct');
                this.isOwner = true;
                this.notification = false;
              } else {
                this.notification = true;
                this.isOwner = false;
                console.log('Not User Object');
              }
            });
        }
      });
    } else {
      // this.route.navigate(['\dashboard']);
    }
    console.log(localStorage.getItem('post-detail'));

  }

  editPost() {

    this.dialog.open(EditPostComponent, {
      width: '750px',
      height: '600px'
    });

  }

  deletePost() {
    const headers = {
      headers: {'Authorization': ApiConst.JWT + ApiConst.TOKENHEADER}
    };
    const lookup = 'Authentication credentials were not provided.';
    const signatureExp = 'Signature has expired.';
    swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this post!',
      icon: 'warning',
      showCancelButton: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.postService.deleteBlogPost(this.slug, headers)
          .subscribe((response) => {
            this.route.navigate(['dashboard']);
          }, error => {
            if (error.error.detail === signatureExp) {
              swal.fire('Login!', 'Signature has expired. Please log in again', 'warning');
            } else {
              console.log(error);
              swal.fire('Login!', 'You must login to delete!', 'warning');
            }
          });
      }
    });

  }
}
