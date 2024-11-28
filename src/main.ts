import {importProvidersFrom, LOCALE_ID} from '@angular/core';
import localeIt from '@angular/common/locales/it';
import {registerLocaleData} from '@angular/common';
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {HttpClientModule} from '@angular/common/http';

registerLocaleData(localeIt, 'it');

bootstrapApplication(AppComponent, {
  providers: [{provide: LOCALE_ID, useValue: 'it'}, importProvidersFrom(HttpClientModule)],
}).catch(err => console.error(err));
