import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { CountriesComponent } from './countries/countries.component';
import { HttpClientModule } from '@angular/common/http';
import { CardsComponent } from './cards/cards.component';
import { ChartsModule } from 'ng2-charts';
import { LoadersComponent } from './loaders/loaders.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    CountriesComponent,
    CardsComponent,
    LoadersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
