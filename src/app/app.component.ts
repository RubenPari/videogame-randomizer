import { Component } from '@angular/core';
import { VideogameCardComponent } from './components/videogame-card/videogame-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VideogameCardComponent],
  template: `
    <h1>Videogame Randomizer</h1>
    <app-videogame-card></app-videogame-card>
  `,
  styles: [
    `
      h1 {
        text-align: center;
      }
    `,
  ],
})
export class AppComponent {}
