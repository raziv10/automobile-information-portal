import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionModelComponent } from './prediction-model.component';

describe('PredictionModelComponent', () => {
  let component: PredictionModelComponent;
  let fixture: ComponentFixture<PredictionModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictionModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
