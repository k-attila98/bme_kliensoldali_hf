import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {

  movies$: Observable<Movie[]>;
  private searchTerms = new Subject<string>();

  constructor(private movieService: MovieService) { }

  ngOnInit(): void 
  {
    
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.movieService.searchMovies(term).pipe((response:any) => this.movies$ = response.results))
    );

    console.log(this.movies$);
  }

  search(term: string): void
  {
    this.searchTerms.next(term);
    console.log(term);
  }

  makeSearch(term: string): void
  {
    this.movieService.searchMovies(term).subscribe((response:any) => this.movies$ = response.results);
  }
}
