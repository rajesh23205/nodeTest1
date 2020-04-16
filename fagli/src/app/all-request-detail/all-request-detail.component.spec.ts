import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRequestDetailComponent } from './all-request-detail.component';

describe('AllRequestDetailComponent', () => {
  let component: AllRequestDetailComponent;
  let fixture: ComponentFixture<AllRequestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRequestDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
