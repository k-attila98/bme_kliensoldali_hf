import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  page: number;
  total_pages: number;
  selectedGenre: Genre;
  genres: Genre[];
  moviesForGenre: Movie[];
  
  constructor(private route: ActivatedRoute, private router: Router, private movieService: MovieService, private location: Location) { }

  ngOnInit(): void 
  {

    this.route.params.subscribe(params => {
      this.page = Number(this.route.snapshot.paramMap.get('pagenum')) ? Number(this.route.snapshot.paramMap.get('pagenum')) : 1;
      this.getMoviesByGenre(this.page);
    });

    //this.page = 1;
    //this.getMoviesByGenre(this.page);
  }

  getMoviesByGenre(page: number)
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getGenres().subscribe((genres:any) => {
      this.genres = genres.genres;
      this.selectedGenre = this.genres.find(genre => genre.id == id);
    });
    this.movieService.searchByGenre(id, page).subscribe((movies:any) => {
      this.moviesForGenre = movies.results;
      this.total_pages = movies.total_pages;
      this.page = movies.page;
      window.scroll(0,0);
    });
    
  }

  goToPage(moveBy: number)
  {
    let newPage = this.page + moveBy;
    if (newPage <= this.total_pages && newPage >= 1)
    {
      this.getMoviesByGenre(newPage);
    }
  }

  goBack()
  {
    this.router.navigate(['/genres']);
  }

}
