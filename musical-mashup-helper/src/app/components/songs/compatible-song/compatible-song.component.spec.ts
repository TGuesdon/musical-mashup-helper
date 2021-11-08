import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompatibleSongComponent } from './compatible-song.component';

describe('CompatibleSongComponent', () => {
  let component: CompatibleSongComponent;
  let fixture: ComponentFixture<CompatibleSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompatibleSongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompatibleSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
