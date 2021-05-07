import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Movie } from '../movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-search-result',
  templateUrl: './movie-search-result.component.html',
  styleUrls: ['./movie-search-result.component.scss']
})
export class MovieSearchResultComponent implements OnInit {

  query: string;
  movies$: Observable<Movie[]>;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private location: Location) { }

  ngOnInit(): void 
  {
    this.route.params.subscribe(params => {
      this.query = String(this.route.snapshot.paramMap.get('query'));
      this.movieService.searchMovies(this.query).subscribe((response:any) => this.movies$ = response.results);
    });
  }

}
