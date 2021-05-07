import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { MoviesComponent } from './movies/movies.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MovieService } from './services/movie.service';
import { HeaderComponent } from './header/header.component';
import { GenresComponent } from './genres/genres.component';
import { ActorDetailsComponent } from './actor-details/actor-details.component';
import { ActorService } from './services/actor.service';
import { MoviesByGenreComponent } from './movies-by-genre/movies-by-genre.component';
import { MovieSearchResultComponent } from './movie-search-result/movie-search-result.component';

const routes: Routes = [
  { path: '', component: MoviesComponent },
  { path: 'popular/page/:pagenum', component: MoviesComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: 'genres', component: GenresComponent },
  { path: 'genres/:id', component: MoviesByGenreComponent },
  { path: 'genres/:id/page/:pagenum', component: MoviesByGenreComponent },
  { path: 'actor/:id', component: ActorDetailsComponent },
  { path: 'search/:query', component: MovieSearchResultComponent },
  { path: 'search/:query/page/:pagenum', component: MovieSearchResultComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    HeaderComponent,
    MovieDetailComponent,
    MovieSearchComponent,
    GenresComponent,
    ActorDetailsComponent,
    MoviesByGenreComponent,
    MovieSearchResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [
    MovieService,
    ActorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
