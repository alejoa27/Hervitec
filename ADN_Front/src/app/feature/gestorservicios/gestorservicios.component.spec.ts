import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorserviciosComponent } from './gestorservicios.component';

describe('GestorserviciosComponent', () => {
  let component: GestorserviciosComponent;
  let fixture: ComponentFixture<GestorserviciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestorserviciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorserviciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
