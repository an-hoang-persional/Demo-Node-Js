import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CarsComponent } from './cars/cars.component';
import { ColorsComponent } from './colors/colors.component';
import { CompaniesComponent } from './companies/companies.component';
import { CountriesComponent } from './countries/countries.component';
import { GenersComponent } from './geners/geners.component';
import { JobTitlesComponent } from './job-titles/job-titles.component';
import { MoviesComponent } from './movies/movies.component';
import { UniversitiesComponent } from './universities/universities.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    ColorsComponent,
    CompaniesComponent,
    CountriesComponent,
    GenersComponent,
    JobTitlesComponent,
    MoviesComponent,
    UniversitiesComponent,
    UsersComponent
  ],
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
