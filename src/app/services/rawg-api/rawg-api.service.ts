import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RawgApiService {
  private apiUrl = 'https://api.rawg.io/api';
  private apiKey = 'aa75f8b611e2410c8b7bdf0223c912dc';

  constructor(private http: HttpClient) {
  }

  getGames(filters: any): Observable<any> {
    const params = new URLSearchParams();
    params.set('key', this.apiKey);

    if (filters.platform) params.set('platforms', filters.platform);
    if (filters.dates) params.set('dates', filters.dates);
    if (filters.rating) params.set('rating', filters.rating);

    return this.http.get(`${this.apiUrl}/games?${params.toString()}`);
  }

  getGameDetails(gameId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/games/${gameId}?key=${this.apiKey}`);
  }
}
