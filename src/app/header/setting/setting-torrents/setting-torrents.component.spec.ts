import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingTorrentsComponent } from './setting-torrents.component';

describe('SettingTorrentsComponent', () => {
  let component: SettingTorrentsComponent;
  let fixture: ComponentFixture<SettingTorrentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingTorrentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingTorrentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
