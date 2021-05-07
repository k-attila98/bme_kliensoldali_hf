import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Movie[];
  
  constructor(private movieService: MovieService) { }

  ngOnInit(): void 
  {
    this.getMovies();
  }

  getMovies(): void
  {
    this.movieService.getMovies().subscribe((movies:any) => {
      this.movies = movies.results;
    });
  }

}
