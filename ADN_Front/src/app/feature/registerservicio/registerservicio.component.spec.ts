import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterservicioComponent } from './registerservicio.component';

describe('RegisterservicioComponent', () => {
  let component: RegisterservicioComponent;
  let fixture: ComponentFixture<RegisterservicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterservicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterservicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
