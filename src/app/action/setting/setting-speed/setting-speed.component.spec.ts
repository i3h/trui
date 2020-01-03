import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingSpeedComponent } from './setting-speed.component';

describe('SettingSpeedComponent', () => {
  let component: SettingSpeedComponent;
  let fixture: ComponentFixture<SettingSpeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingSpeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingSpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
