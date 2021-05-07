import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Movie } from '../movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  page: number;
  total_pages: number;
  movies: Movie[];
  
  constructor(private route: ActivatedRoute, private movieService: MovieService, private location: Location) { }

  /**
   * Elkéri a népszerű filmeket
   * Route változásra való feliratkozás
   * kért oldal számának kinyerése
   * a kért oldal számának függvényben elkérni a filmeket
   */
  ngOnInit(): void 
  {
    //this.page = 1;
    this.route.params.subscribe(params => {
      this.page = Number(this.route.snapshot.paramMap.get('pagenum')) ? Number(this.route.snapshot.paramMap.get('pagenum')) : 1;
      this.getMovies(this.page);
    });
    
  }

  /**
   * Elkéri a MovieService-től a népserű filmeket
   * beállítja a jelenlegi oldal számát, az összes oldal számát
   * @param page megadjuk hanyadik oldalt szeretnénk látni
   */
  getMovies(page: number): void
  {
    this.movieService.getMovies(page).subscribe((movies:any) => {
      this.movies = movies.results;
      this.total_pages = movies.total_pages;
      this.page = movies.page;
      window.scroll(0,0);
    });
  }

  /**
   * Lapozás megvalósításához szükséges
   * kiszámolja az új oldal számát, majd ezt elkéri
   * @param moveBy megadjuk hogy mennyivel lépjünk arrébb
   */
  goToPage(moveBy: number)
  {
    let newPage = this.page + moveBy;
    if (newPage <= this.total_pages && newPage >= 1)
    {
      this.getMovies(newPage);
    }
  }


}
