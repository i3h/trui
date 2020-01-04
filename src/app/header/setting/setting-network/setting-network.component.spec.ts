import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingNetworkComponent } from './setting-network.component';

describe('SettingNetworkComponent', () => {
  let component: SettingNetworkComponent;
  let fixture: ComponentFixture<SettingNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
