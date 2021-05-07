import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../movie';
import { Cast } from '../cast';
import { Genre } from '../genre';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private moviesBaseUrl = 'https://api.themoviedb.org/3/movie/';
  private moviesSearchUrl = 'https://api.themoviedb.org/3/search/movie';
  private apiKey = 'cb3ec39c86940d8a9a1dbd18572fabb2';

  constructor(private http: HttpClient) { }

  /**
   * Küld az API számára egy GET kérést, 
   * elkéri a népszerű filmek listáját
   * @param page megadjuk hanyadik oldalt szeretnénk látni
   * @returns az adott oldalon lévő népszerű filmek, any-ként castlva a subscribeon belül .results alatt elérhető
   */
  getMovies(page: number) : Observable<Movie[]>
  {
    let moviesUrl = `${this.moviesBaseUrl}popular?api_key=${this.apiKey}&language=en-US&page=${page}`;
    return this.http.get<Movie[]>(moviesUrl);
  }
  
  /**
   * Küld az API számára egy GET kérést, 
   * elkéri egy id-val megadott film adatlapját
   * @param id a film id-ja amit lekérünk
   * @returns a lekért film adatlapja
   */
  getMovie(id: number): Observable<Movie>
  {
    let movieUrl = `${this.moviesBaseUrl}${id}?api_key=${this.apiKey}&language=en-US`;
    return this.http.get<Movie>(movieUrl);
  }

  /**
   * Küld az API számára egy GET kérést, 
   * elkéri az összes filmet az adott kifejezéssel a címben
   * @param term a keresett kifejezés
   * @param page megadjuk hanyadik oldalt szeretnénk látni
   * @returns az adott oldalon lévő keresett filmek, any-ként castlva a subscribeon belül .results alatt elérhető
   */
  searchMovies (term: string, page: number): Observable<Movie[]>
  {
    let searchUrl = `${this.moviesSearchUrl}?api_key=${this.apiKey}&language=en-US&query=${term}&page=${page}`;
    return this.http.get<Movie[]>(searchUrl);
  }

  /**
   * Küld az API számára egy GET kérést, 
   * elkéri egy keresett film szereplőit
   * @param id az keresett film id-ja
   * @returns az adott film szereplőinek listája, .cast alatt elérhető
   */
  getCast(id: number): Observable<Cast[]>
  {
    
    let castUrl = `${this.moviesBaseUrl}/${id}/credits?api_key=${this.apiKey}&language=en-US`;
    
    //console.log(this.http.get<Genre[]>(genresUrl));
    return this.http.get<Cast[]>(castUrl);
  }

  /**
   * Küld az API számára egy GET kérést, 
   * elkéri az összes elérhető kategóriát
   * @returns az összes kategória
   */
  getGenres(): Observable<Genre[]>
  {
    let genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`;

    return this.http.get<Cast[]>(genreUrl);
  }
  
  /**
   * Küld az API számára egy GET kérést, 
   * elkéri a kategóriában található összes filmet
   * @param id a kategória id-ja
   * @param page az oldal száma
   * @returns az adott odlalon lévő, egy kategóriába tartozó filmek listája
   */
  searchByGenre(id: number, page: number): Observable<Movie[]>
  {
    let genreSearchUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=${id}&with_original_language=en&page=${page}`

    return this.http.get<Movie[]>(genreSearchUrl);
  }
}
