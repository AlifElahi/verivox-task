import { Component, ComponentRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

import { CustomComponentDirective } from './custom-component.directive';

@Component({
  selector: 'app-custom-component',
  templateUrl: './custom-component.component.html',
  styleUrls: ['./custom-component.component.scss'],
})
/**
 * This class takes a component and data of any type, it creates an instance of received component type and pass the
 * received data as input to that component and renders.
 */
export class CustomComponentComponent implements  OnChanges {
  @Input({ required: true }) component: any;
  @Input({ required: true }) item: any;
  //This can be changed to be more generic.
  @Input({ required: true }) index: any;
  /**
   * Reference to the Directive to render custom component
   */
  @ViewChild(CustomComponentDirective, { static: true })
  customComp!: CustomComponentDirective;

  // Store the reference to the created component
  private componentRef: ComponentRef<any> | null = null;

  constructor() {}

/**
 *  Will update the component when the data changes
 * also create a new one in case o first initialization
 * @param changes properties that changed
 */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['index'] || changes['item']) {
      this.createOrUpdateComponentInstance();
    }
  }

  
/**
 * Creates a new component instance or updates the existing one with the current inputs.
 * 
 * If a component instance already exists, it updates the `data` and `index` inputs
 * of the instance with the current values. Otherwise, it creates a new component
 * instance using the `CustomComponentDirective`'s view container reference and sets
 * the initial `data` and `index` inputs.
 */
  private createOrUpdateComponentInstance(): void {
    if (this.componentRef) {
      // If component exists, update inputs
      this.componentRef.instance.data = this.item;
      this.componentRef.instance.index = this.index;
    } else {
      this.componentRef = this.customComp.viewContainerRef.createComponent<any>(this.component);
      this.componentRef.instance.data = this.item;
      this.componentRef.instance.index = this.index;
    }
  }
}
