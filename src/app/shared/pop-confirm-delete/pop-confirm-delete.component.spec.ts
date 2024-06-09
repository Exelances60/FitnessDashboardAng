import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopConfirmDeleteComponent } from './pop-confirm-delete.component';

describe('PopConfirmDeleteComponent', () => {
  let component: PopConfirmDeleteComponent;
  let fixture: ComponentFixture<PopConfirmDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopConfirmDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopConfirmDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
