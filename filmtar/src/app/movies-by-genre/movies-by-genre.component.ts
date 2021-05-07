import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Genre } from '../genre';
import { Movie } from '../movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies-by-genre',
  templateUrl: './movies-by-genre.component.html',
  styleUrls: ['./movies-by-genre.component.scss']
})
export class MoviesByGenreComponent implements OnInit {

  selectedGenre: Genre;
  genres: Genre[];
  moviesForGenre: Movie[];
  
  constructor(private route: ActivatedRoute, private movieService: MovieService, private location: Location) { }

  ngOnInit(): void 
  {
    this.getMoviesByGenre();
  }

  getMoviesByGenre()
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getGenres().subscribe((genres:any) => {
      this.genres = genres.genres;
      this.selectedGenre = this.genres.find(genre => genre.id == id);
    });
    this.movieService.searchByGenre(id).subscribe((movies:any) => this.moviesForGenre = movies.results)
    
  }

  goBack()
  {
    this.location.back();
  }

}
