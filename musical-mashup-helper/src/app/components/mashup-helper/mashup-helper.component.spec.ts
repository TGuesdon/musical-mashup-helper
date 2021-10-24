import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MashupHelperComponent } from './mashup-helper.component';

describe('MashupHelperComponent', () => {
  let component: MashupHelperComponent;
  let fixture: ComponentFixture<MashupHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MashupHelperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MashupHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
