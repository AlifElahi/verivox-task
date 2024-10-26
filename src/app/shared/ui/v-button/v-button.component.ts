import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-v-button', // Updated selector
  templateUrl: './v-button.component.html',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  styleUrls: ['./v-button.component.scss'],
})
export class VButtonComponent implements OnInit {
  /**
   * The type of Angular Material button ['raised', 'flat', 'basic',...], default is 'flat'.
   */
  @Input() type: keyof typeof VButtonComponent.prototype.buttonStyles = 'flat';

  /**
   * Whether the button is disabled.
   */
  @Input() disabled = false;

  /**
   * Event emitter to notify the parent component when the button is clicked.
   */
  @Output() action = new EventEmitter<void>();

  /**
   * List of button styles (directives and classes) based on the selected type.
   */
  buttonStyles: { [key: string]: string };

  constructor() {
    this.buttonStyles = {
      raised: 'mat-raised-button',
      basic: 'mat-mdc-button',
      flat: 'mat-mdc-unelevated-button',
      stroked: 'mat-mdc-outlined-button',
    };
  }

  ngOnInit(): void {
    if (!Object.keys(this.buttonStyles).includes(this.type as string)) {
      throw new Error('Unknown button type provided');
    }
  }
}
