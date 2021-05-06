import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actor } from '../actor';
import { Role } from '../role';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private actorBaseUrl = 'https://api.themoviedb.org/3/person/';
  private moviesSearchUrl = 'https://api.themoviedb.org/3/search/movie';
  private apiKey = 'cb3ec39c86940d8a9a1dbd18572fabb2';

  constructor(private http: HttpClient) { }

  getActor(id: number): Observable<Actor>
  {
    let actorUrl = `${this.actorBaseUrl}${id}?api_key=${this.apiKey}&language=en-US`;

    return this.http.get<any>(actorUrl);
  }

  getRolesForActor(id: number): Observable<Role[]>
  {
    let rolesUrl = `${this.actorBaseUrl}${id}/movie_credits?api_key=${this.apiKey}&language=en-US`;
    return this.http.get<any>(rolesUrl);
  }
}
