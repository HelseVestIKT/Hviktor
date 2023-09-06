import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoursComponent } from './colours.component';

describe('ColoursComponent', () => {
  let component: ColoursComponent;
  let fixture: ComponentFixture<ColoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
