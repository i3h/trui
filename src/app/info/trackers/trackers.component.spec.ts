import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackersComponent } from './trackers.component';

describe('TrackersComponent', () => {
  let component: TrackersComponent;
  let fixture: ComponentFixture<TrackersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
