import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDebateComponent } from './create-debate.component';

describe('CreateDebateComponent', () => {
  let component: CreateDebateComponent;
  let fixture: ComponentFixture<CreateDebateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDebateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDebateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
