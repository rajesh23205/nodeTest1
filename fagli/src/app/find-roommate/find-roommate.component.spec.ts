import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindRoommateComponent } from './find-roommate.component';

describe('FindRoommateComponent', () => {
  let component: FindRoommateComponent;
  let fixture: ComponentFixture<FindRoommateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindRoommateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindRoommateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
