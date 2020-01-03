import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedComponent } from './speed.component';

describe('SpeedComponent', () => {
  let component: SpeedComponent;
  let fixture: ComponentFixture<SpeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
