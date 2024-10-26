import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-v-card',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './v-card.component.html',
  styleUrl: './v-card.component.scss',
})
export class VCardComponent {
  /**
   * Optional title for the card.
   */
  @Input() title?: string;
}
