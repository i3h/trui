import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingRPCComponent } from './setting-rpc.component';

describe('SettingRPCComponent', () => {
  let component: SettingRPCComponent;
  let fixture: ComponentFixture<SettingRPCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingRPCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingRPCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
