import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

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
export class CustomComponentComponent implements OnInit, OnChanges {
  @Input({ required: true }) component: any;
  @Input({ required: true }) item: any;
  @Input({ required: true }) index: any;
  /**
   * Reference to the Directive to render custom component
   */
  @ViewChild(CustomComponentDirective, { static: true })
  customComp!: CustomComponentDirective;

  constructor() {}

  ngOnInit(): void {
    this.createComponentInstance();
  }
/**
 *  Will update the component when the data changes
 * @param changes properties that changed
 */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['index'] || changes['item']) {
      this.createComponentInstance();
    }
  }

  private createComponentInstance(): void {
    //clearing any previous content
    this.customComp?.viewContainerRef.clear();
    //creating a new component
    const componentRef = this.customComp?.viewContainerRef.createComponent<any>(this.component);
    //injecting the input for custom component.
    if (componentRef) {
      componentRef.instance.data = this.item;
      componentRef.instance.index = this.index;
    }
  }
}
