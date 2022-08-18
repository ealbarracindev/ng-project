import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableSharedComponent } from './mat-table-shared.component';

describe('MatTableSharedComponent', () => {
  let component: MatTableSharedComponent;
  let fixture: ComponentFixture<MatTableSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTableSharedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatTableSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
