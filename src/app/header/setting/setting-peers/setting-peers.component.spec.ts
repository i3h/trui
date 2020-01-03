import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPeersComponent } from './setting-peers.component';

describe('SettingPeersComponent', () => {
  let component: SettingPeersComponent;
  let fixture: ComponentFixture<SettingPeersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingPeersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingPeersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
