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
  page: number;
  total_pages: number;
  movies$: Observable<Movie[]>;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private location: Location) { }

  ngOnInit(): void 
  {
    this.route.params.subscribe(params => {
      this.query = String(this.route.snapshot.paramMap.get('query'));
      this.page = 1;
      this.searchMovies(this.query, this.page);
    });
  }

  searchMovies(query: string, page: number)
  {
    this.movieService.searchMovies(query, page)
      .subscribe((response:any) => {
        this.movies$ = response.total_results ? response.results : undefined;
        this.page = response.page;
        this.total_pages = response.total_pages;
        window.scroll(0,0);
      });
  }

  goToPage(moveBy: number)
  {
    let newPage = this.page + moveBy;
    if (newPage <= this.total_pages && newPage >= 1)
    {
      this.searchMovies(this.query, newPage);
    }
  }

}
