import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef, NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';

import { CustomComponentComponent } from './custom-component.component';
import { CustomComponentDirective } from './custom-component.directive';

describe('CustomComponentComponent', () => {
  let component: CustomComponentComponent;
  let fixture: ComponentFixture<CustomComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CustomComponentComponent,CustomComponentDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomComponentComponent);
    component = fixture.componentInstance;
    component.customComp = {
      viewContainerRef: {
        createComponent: jasmine.createSpy('createComponent')
      }
    } as unknown as CustomComponentDirective;
        // Mock componentRef with an instance object that has data and index properties
        component['componentRef'] = {
          instance: {
            data: null,
            index: null
          }
        } as unknown as ComponentRef<any>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createOrUpdateComponentInstance on ngOnChanges', () => {
    spyOn(component as any, 'createOrUpdateComponentInstance');
    
    // Trigger ngOnChanges
    component.ngOnChanges({
      item: new SimpleChange(null, component.item, true),
      index: new SimpleChange(null, component.index, true),
    });

    expect((component as any).createOrUpdateComponentInstance).toHaveBeenCalled();
  });
  it('should not call viewContainerRef.createComponent if componentRef is already present', () => {
    (component as any).createOrUpdateComponentInstance();
    expect(component.customComp.viewContainerRef.createComponent).not.toHaveBeenCalled();
  });

  it('should call viewContainerRef.createComponent if componentRef is null', () => {
    component.customComp = {
      viewContainerRef: {
        createComponent: jasmine.createSpy('createComponent').and.returnValue({
          instance: { data: null, index: null }
        } as ComponentRef<any>)
      }
    } as unknown as CustomComponentDirective;

    // Set componentRef to null to simulate that no component instance exists
    component['componentRef'] = null;
    component.component = {};  // Set the component input to a dummy component
    component.item = { name: 'Test Item' };
    component.index = 1;

    // Call createOrUpdateComponentInstance directly
    (component as any).createOrUpdateComponentInstance();

    // Expect createComponent to be called because componentRef is null
    expect(component.customComp.viewContainerRef.createComponent).toHaveBeenCalled();
  });
});
