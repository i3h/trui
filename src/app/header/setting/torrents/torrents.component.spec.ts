import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TorrentsComponent } from './torrents.component';

describe('TorrentsComponent', () => {
  let component: TorrentsComponent;
  let fixture: ComponentFixture<TorrentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TorrentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TorrentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
