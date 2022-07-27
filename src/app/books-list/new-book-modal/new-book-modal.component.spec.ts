import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBookModalComponent } from './new-book-modal.component';

describe('NewBookModalComponent', () => {
  let component: NewBookModalComponent;
  let fixture: ComponentFixture<NewBookModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBookModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
