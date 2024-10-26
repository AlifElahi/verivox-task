import {
  DropDownOption,
  VDropdownComponent,
} from '../../../shared/ui/v-dropdown/v-dropdown.component';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VButtonComponent } from '../../../shared/ui/v-button/v-button.component';
import { VCardComponent } from '../../../shared/ui/v-card/v-card.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    VCardComponent,
    VButtonComponent,
    RouterModule,
    CommonModule,
    VDropdownComponent,
    FormsModule,
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
}
