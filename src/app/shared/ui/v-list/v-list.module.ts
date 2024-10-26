import { CommonModule } from '@angular/common';
import { CustomComponentComponent } from './v-list/custom-component/custom-component.component';
import { CustomComponentDirective } from './v-list/custom-component/custom-component.directive';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { VDropdownComponent } from '../v-dropdown/v-dropdown.component';
import { VListComponent } from './v-list/v-list.component';

@NgModule({
  declarations: [
    VListComponent,
    CustomComponentComponent,
    CustomComponentDirective,
  ],
  imports: [
    CommonModule,
    ScrollingModule,
    VDropdownComponent,
    MatListModule,
    CommonModule,
    MatProgressBarModule,
  ],
  exports: [VListComponent],
})
export class VListModule {}
