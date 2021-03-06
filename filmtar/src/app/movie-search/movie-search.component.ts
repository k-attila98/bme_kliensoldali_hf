import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {

  movies$: Observable<Movie[]>;

  constructor(private router: Router) { }

  ngOnInit(): void 
  {
  }

  /**
   * Függvény, amivel a search/:term route-ra navigálunk, hogy a filmek címei között lehessen keresni
   * paraméterként teszi fel a route-ra a keresendő szöveget, ezt a MovieService fogja kiolvasni
   * ha nincs semmi megadva, visszanavigál a főoldalra
   * @param term a szöveg amire rá legyen keresve
   */
  makeSearch(term: string): void
  {
    if(term != null && term != "")
    {
      this.router.navigate(['/search', term]);
    }
    else
    {
      this.router.navigate(['/']);
    }

  }
}
