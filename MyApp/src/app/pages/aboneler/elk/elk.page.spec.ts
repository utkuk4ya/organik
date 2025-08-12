import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElkPage } from './elk.page';

describe('ElkPage', () => {
  let component: ElkPage;
  let fixture: ComponentFixture<ElkPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ElkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
