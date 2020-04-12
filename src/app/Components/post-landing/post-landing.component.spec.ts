import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLandingComponent } from './post-landing.component';

describe('PostLandingComponent', () => {
  let component: PostLandingComponent;
  let fixture: ComponentFixture<PostLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
