import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private apiUrl =
    'https://translation-api.politepond-64abc1db.italynorth.azurecontainerapps.io/translate';

  constructor(private http: HttpClient) {}

  translateText(text: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      textToTranslate: text,
      targetLang: 'it',
    });
  }
}
