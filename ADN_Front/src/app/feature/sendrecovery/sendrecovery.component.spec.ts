import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendrecoveryComponent } from './sendrecovery.component';

describe('SendrecoveryComponent', () => {
  let component: SendrecoveryComponent;
  let fixture: ComponentFixture<SendrecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendrecoveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendrecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
