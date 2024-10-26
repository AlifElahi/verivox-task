import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TariffCardComponent } from './components/tariff-card/tariff-card.component';
import { TariffListComponent } from './screens/tariff-list/tariff-list.component';
import { TariffRoutingModule } from './tariff-routing.module';
import { VButtonComponent } from '../../shared/ui/v-button/v-button.component';
import { VCardComponent } from '../../shared/ui/v-card/v-card.component';
import { VListModule } from '../../shared/ui/v-list/v-list.module';

@NgModule({
  declarations: [TariffListComponent, TariffCardComponent],
  imports: [CommonModule, VCardComponent, VButtonComponent, VListModule],
  exports: [TariffRoutingModule],
})
export class TariffModule {}
