import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MovieService } from '../services/movie.service';
import { Movie } from '../movie';
import { Cast } from '../cast';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit 
{

  movie: Movie;
  cast: Cast[];

  constructor(private route: ActivatedRoute, private movieService: MovieService, private location: Location) { }

  ngOnInit(): void 
  {
    this.getMovie();
  }

  getMovie()
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getMovie(id).subscribe(movie => this.movie = movie);
    this.movieService.getCast(id).subscribe((cast:any) => this.cast = cast.cast);
  }

  goBack(): void {
    this.location.back();
  }
}
