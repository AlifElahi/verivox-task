import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { VDropdownComponent } from './v-dropdown.component';

describe('VDropdownComponent', () => {
  let component: VDropdownComponent;
  let fixture: ComponentFixture<VDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VDropdownComponent, MatFormFieldModule, MatSelectModule, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(VDropdownComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the provided label', () => {
    component.label = 'Sort By';
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('mat-label')).nativeElement;
    expect(labelElement.textContent).toContain('Sort By');
  });


  it('should emit selected value on selection change', () => {
    spyOn(component.selectionChange, 'emit');
    const testValue = '2';
    component.onSelectionChange(testValue);

    expect(component.selectionChange.emit).toHaveBeenCalledWith(testValue);
  });

});
