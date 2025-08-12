import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuPage } from './su.page';

describe('SuPage', () => {
  let component: SuPage;
  let fixture: ComponentFixture<SuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
