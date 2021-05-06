import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from './movie';
import { Cast } from './cast';
import { Genre } from './genre';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { HttpModule, Request, Response, Headers, Http } from '@angular/http';

/*
const MOVIES: Movie[] = [
  {id: 1, title: 'skere'},
  {id: 2, title: 'lmao'},
  {id: 3, title: 'ali'},
  {id: 4, title: 'turbo'},
  {id: 5, title: 'titan'}
];
*/

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private moviesBaseUrl = 'https://api.themoviedb.org/3/movie/';
  private moviesSearchUrl = 'https://api.themoviedb.org/3/search/movie';
  private apiKey = 'cb3ec39c86940d8a9a1dbd18572fabb2';

  constructor(private http: HttpClient) { }

  getMovies() : Observable<Movie[]>
  {
    let moviesUrl = `${this.moviesBaseUrl}popular?api_key=${this.apiKey}&language=en-US`;
    return this.http.get<any[]>(moviesUrl);
  }
  
  getMovie(id: number): Observable<Movie>
  {
    /*
    const movie = of(MOVIES.find(m => m.id == id));
    return movie;*/

    let movieUrl = `${this.moviesBaseUrl}${id}?api_key=${this.apiKey}&language=en-US`;
    return this.http.get<Movie>(movieUrl);
  }

  searchMovies (term: string): Observable<Movie[]>
  {
    /*
    const movies = of(MOVIES.filter(m => m.title.match(term)));
    return movies;*/
    let searchUrl = `${this.moviesSearchUrl}?api_key=${this.apiKey}&language=en-US&query=${term}`;
    return this.http.get<any[]>(searchUrl);
  }

  getCast(id: number): Observable<Cast[]>
  {
    
    let castUrl = `${this.moviesBaseUrl}/${id}/credits?api_key=${this.apiKey}&language=en-US`;
    
    //console.log(this.http.get<Genre[]>(genresUrl));
    return this.http.get<Cast[]>(castUrl);
  }

  getGenres(): Observable<Genre[]>
  {
    let genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`;

    return this.http.get<Cast[]>(genreUrl);
  }
  
  searchByGenre(id: number): Observable<Movie[]>
  {
    let genreSearchUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=${id}&with_original_language=en`

    return this.http.get<Movie[]>(genreSearchUrl);
  }
}
