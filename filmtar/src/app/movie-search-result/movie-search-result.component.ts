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

  /**
   * Egy kifejezésre keres rá a filmek címében
   * Route változásra való feliratkozás
   * keresett kifejezés kinyerése
   * a kifejezés és a keresett oldal számának függvényben keresés
   */
  ngOnInit(): void 
  {
    //this.page = 1;
    this.route.params.subscribe(params => {
      this.query = String(this.route.snapshot.paramMap.get('query'));
      this.page = Number(this.route.snapshot.paramMap.get('pagenum')) ? Number(this.route.snapshot.paramMap.get('pagenum')) : 1
      this.searchMovies(this.query, this.page);
    });
  }

  /**
   * Függvény amivel a MovieService-től el tudjuk kérni a keresett kifejezésre illeszkedő filmek egy lapját
   * ha nincsen találat akkor undefined lesz, így a template-ben ezt ki lehet használni
   * elkéri az összes oldal számát is, beállítja a jelenlegi oldalt arra amelyiket elkértük
   * visszatekeri az odlalt a tetejére
   * @param query a kifejezés amire keresünk
   * @param page az oldal száma, amelyiket el szeretnénk kérni
   */
  searchMovies(query: string, page: number)
  {
    this.movieService.searchMovies(query, page)
      .subscribe((response:any) => {
        this.movies$ = response.total_results > 0 ? response.results : undefined;
        this.total_pages = response.total_pages;
        this.page = response.page;
        window.scroll(0,0);
      });
  }

  /**
   * Lapozás megvalósításához szükséges
   * kiszámolja az új oldal számát, majd ezt elkéri ugyanarra a kifejezésre
   * @param moveBy megadjuk hogy mennyivel lépjünk arrébb
   */
  goToPage(moveBy: number)
  {
    let newPage = this.page + moveBy;
    if (newPage <= this.total_pages && newPage >= 1)
    {
      this.searchMovies(this.query, newPage);
    }
  }

}
