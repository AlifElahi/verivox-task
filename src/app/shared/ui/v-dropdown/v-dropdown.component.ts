import { Component, Input, output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

/**
 * The interface for the dropdown option.
 * This interface defines the label and value of the option.
 * */
export interface DropDownOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-v-dropdown',
  standalone: true,
  imports: [MatSelectModule, MatFormFieldModule, CommonModule],
  templateUrl: './v-dropdown.component.html',
  styleUrls: ['./v-dropdown.component.scss'],
})

/**
 * Dropdown component for selecting an option from a list.
 * This is a reuseable dropdown component which is customized as per the needs of the application.
 */
export class VDropdownComponent {
  /**
   * The label for the dropdown.
   */
  @Input() label: string = '';

  /**
   * The list of options for the dropdown.
   */
  @Input() options: DropDownOption[] = [];

  /**
   * The selected value from the dropdown.
   */
  @Input() selectedValue?: string;

  /**
   * Output event to notify the parent component of the selected option.
   */
  selectionChange = output<string>();

  /**
   * Emit the selected option.
   */
  onSelectionChange(value: string) {
    this.selectionChange.emit(value);
  }
}
