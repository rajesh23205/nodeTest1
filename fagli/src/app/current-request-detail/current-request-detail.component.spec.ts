import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRequestDetailComponent } from './current-request-detail.component';

describe('CurrentRequestDetailComponent', () => {
  let component: CurrentRequestDetailComponent;
  let fixture: ComponentFixture<CurrentRequestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentRequestDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
