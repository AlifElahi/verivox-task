import { Component, Input, OnInit, output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-v-button', // Updated selector
  templateUrl: './v-button.component.html',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  styleUrls: ['./v-button.component.scss'],
})

/**
 * Component for a custom Angular Material button.
 * This is a reuseable component with a  Angular Material button customized as per application needs .
 * @param type Type of the button.
 * @param disabled Whether the button is disabled.
 * @param action Event emitter to notify the parent component when the button is clicked.
 * 
 */
export class VButtonComponent implements OnInit {
  /**
   * The type of Angular Material button ['raised', 'basic',...], default is 'basic'.
   */
  @Input() type: keyof typeof VButtonComponent.prototype.buttonStyles = 'basic';

  /**
   * Whether the button is disabled.
   */
  @Input() disabled = false;

  /**
   * Event emitter to notify the parent component when the button is clicked.
   */
  action = output<void>();

  /**
   * List of button styles (directives and classes) based on the selected type.
   */
  buttonStyles: { [key: string]: string };

  constructor() {
    // Set the button styles based on the selected type
    this.buttonStyles = {
      raised: 'mat-raised-button',
      basic: 'mat-mdc-button',
    };
  }

  ngOnInit(): void {
    if (!Object.keys(this.buttonStyles).includes(this.type as string)) {
      throw new Error('Unknown button type provided');
    }
  }
}
