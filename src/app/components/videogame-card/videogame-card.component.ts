import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { RawgApiService } from '../../services/rawg-api/rawg-api.service';
import { TranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'app-videogame-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [DatePipe],
  templateUrl: './videogame-card.component.html',
  styleUrls: ['./videogame-card.component.css'],
})
export class VideogameCardComponent {
  filtersForm: FormGroup;
  game: any = null;

  platforms = [
    { id: '4', name: 'PlayStation 4' },
    { id: '187', name: 'PlayStation 5' },
    { id: '1', name: 'Xbox One' },
    { id: '186', name: 'Xbox Series X/S' },
    { id: '18', name: 'PC' },
    { id: '7', name: 'Nintendo Switch' },
  ];

  constructor(
    private fb: FormBuilder,
    private rawgApiService: RawgApiService,
    private translationService: TranslationService,
    private datePipe: DatePipe
  ) {
    this.filtersForm = this.fb.group({
      platform: [''],
      startDate: [''],
      endDate: [''],
      rating: ['', [Validators.min(0), Validators.max(100)]],
    });
  }

  get canGenerate(): boolean {
    const { platform, startDate, endDate, rating } = this.filtersForm.value;
    return !!(platform || startDate || endDate || rating);
  }

  get ratingControl() {
    return this.filtersForm.get('rating');
  }

  generateGame(): void {
    if (!this.canGenerate) {
      alert('Compila almeno un campo prima di generare un videogioco!');
      return;
    }

    const { platform, startDate, endDate, rating } = this.filtersForm.value;

    const filters = {
      platform,
      dates: startDate && endDate ? `${startDate},${endDate}` : '',
      rating,
    };

    this.rawgApiService.getGames(filters).subscribe((response: any) => {
      const randomIndex = Math.floor(Math.random() * response.results.length);
      const selectedGame = response.results[randomIndex];

      this.rawgApiService.getGameDetails(selectedGame.id).subscribe(
        (details: any) => {
          selectedGame.released = this.datePipe.transform(
            selectedGame.released,
            'dd MMMM yyyy',
            'it-IT'
          );

          this.translationService
            .translateText(details.description || 'Descrizione non disponibile')
            .subscribe(
              (translationResponse) => {
                selectedGame.description = translationResponse.translation;
                this.game = selectedGame;
              },
              (error) => {
                console.error(
                  'Errore nella traduzione della descrizione:',
                  error
                );
                alert(
                  'Errore nella traduzione della descrizione del videogioco.'
                );
              }
            );
        },
        (error) => {
          console.error('Errore nel recupero della descrizione:', error);
          alert('Errore nel recupero della descrizione del videogioco.');
        }
      );
    });
  }
}
