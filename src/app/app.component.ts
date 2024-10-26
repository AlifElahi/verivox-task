import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VHeaderComponent } from './core/components/v-header/v-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'verivox-interview';
}
