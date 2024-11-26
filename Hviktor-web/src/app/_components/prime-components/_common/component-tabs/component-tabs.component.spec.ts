import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTabsComponent } from './component-tabs.component';

describe('ComponentTabsComponent', () => {
  let component: ComponentTabsComponent;
  let fixture: ComponentFixture<ComponentTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
