import { Component, Input } from '@angular/core';

import { Tariff } from '../../models/tariff.model';

@Component({
  selector: 'app-tariff-card',
  templateUrl: './tariff-card.component.html',
  styleUrl: './tariff-card.component.scss',
})
export class TariffCardComponent {
  @Input({ required: true }) data!: Tariff; // Data for the item
  @Input({ required: true }) index!: number; // Index of the item in the list

  onButtonClick() {
    console.log('Button clicked', this.data, this.index);
  }
}
