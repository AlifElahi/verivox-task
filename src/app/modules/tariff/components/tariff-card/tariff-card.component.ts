import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Tariff } from '../../models/tariff.model';
import { VButtonComponent } from '../../../../shared/ui/v-button/v-button.component';
import { VCardComponent } from '../../../../shared/ui/v-card/v-card.component';

@Component({
  selector: 'app-tariff-card',
  standalone: true,
  imports:[VCardComponent,VButtonComponent,CommonModule,MatTooltipModule],
  templateUrl: './tariff-card.component.html',
  styleUrl: './tariff-card.component.scss',
})
export class TariffCardComponent {
  /**
   * Tariff data to display
   * @param data - Data for the item
   */
  @Input({ required: true }) data!: Tariff; // Data for the item
  /**
   * Index to display
   *  @param index - Index of the item in the list
   */
  @Input({ required: true }) index!: number; 

}
