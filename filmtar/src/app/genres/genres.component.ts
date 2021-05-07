import { Component, OnInit } from '@angular/core';
import { Genre } from '../genre';
import { Movie } from '../movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {

  selectedGenre: Genre;
  genres: Genre[];
  moviesForGenre: Movie[];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void 
  {
    this.movieService.getGenres().subscribe((genres:any) => this.genres = genres.genres)
  }

}
