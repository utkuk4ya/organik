import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GazPage } from './gaz.page';

describe('GazPage', () => {
  let component: GazPage;
  let fixture: ComponentFixture<GazPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GazPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
