import { Directive, ViewContainerRef } from '@angular/core';

/**
 * This reuseable custom directive with viewContainerRef can be used as a targeted container to render dynamic components
 */
@Directive({
  selector: '[appCustomComponent]',
})
export class CustomComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
