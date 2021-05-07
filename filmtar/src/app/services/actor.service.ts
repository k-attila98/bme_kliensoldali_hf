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
  private apiKey = 'cb3ec39c86940d8a9a1dbd18572fabb2';

  constructor(private http: HttpClient) { }

  /**
   * Küld az API számára egy GET kérést, 
   * egy színész adatlapját kéri le
   * @param id a lekérni kívánt színész id-ja
   * @returns a színész adatlapja
   */
  getActor(id: number): Observable<Actor>
  {
    let actorUrl = `${this.actorBaseUrl}${id}?api_key=${this.apiKey}&language=en-US`;

    return this.http.get<Actor>(actorUrl);
  }

  /**
   * Elkéri a szerepeket egy színész id-hoz
   * @param id az adott színész id-ja
   * @returns a színész szerepei, any[]-ként castolva, majd .roles alatt elérhető
   */
  getRolesForActor(id: number): Observable<Role[]>
  {
    let rolesUrl = `${this.actorBaseUrl}${id}/movie_credits?api_key=${this.apiKey}&language=en-US`;
    return this.http.get<Role[]>(rolesUrl);
  }
}
