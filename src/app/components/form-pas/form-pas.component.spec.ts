import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPasComponent } from './form-pas.component';

describe('FormPasComponent', () => {
  let component: FormPasComponent;
  let fixture: ComponentFixture<FormPasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormPasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
