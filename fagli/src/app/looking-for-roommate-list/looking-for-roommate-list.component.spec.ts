import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookingForRoommateListComponent } from './looking-for-roommate-list.component';

describe('LookingForRoommateListComponent', () => {
  let component: LookingForRoommateListComponent;
  let fixture: ComponentFixture<LookingForRoommateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookingForRoommateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookingForRoommateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
