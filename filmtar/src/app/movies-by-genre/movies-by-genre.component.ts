import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  
  constructor(private route: ActivatedRoute, private router: Router, private movieService: MovieService) { }

  /**
   * Elkéri a filmeket egy kategóriában
   * Route változásra való feliratkozás
   * kért oldal számának kinyerése
   * a kért oldal számának függvényben elkérni a filmeket egy kategóriában
   */
  ngOnInit(): void 
  {

    this.route.params.subscribe(params => {
      this.page = Number(this.route.snapshot.paramMap.get('pagenum')) ? Number(this.route.snapshot.paramMap.get('pagenum')) : 1;
      this.getMoviesByGenre(this.page);
    });
  }

  /**
   * Elkéri a MovieService-től az id-vel megadott kategóriában lévő filmeket
   * és keresett kategóriának a nevét is beállítja
   * az id-t a route :id-jából nyeri ki
   * @param page megadjuk hogy melyik oldalt szeretnénk látni
   */
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
      this.getMoviesByGenre(newPage);
    }
  }

  /**
   * Oldalról való elnavigáláshoz szükséges,
   * a kategóráik oldalra lép át
   */
  goBack()
  {
    this.router.navigate(['/genres']);
  }

}
