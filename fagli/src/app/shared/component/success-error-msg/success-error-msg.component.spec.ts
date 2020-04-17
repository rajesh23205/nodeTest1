import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessErrorMsgComponent } from './success-error-msg.component';

describe('SuccessErrorMsgComponent', () => {
  let component: SuccessErrorMsgComponent;
  let fixture: ComponentFixture<SuccessErrorMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessErrorMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessErrorMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
