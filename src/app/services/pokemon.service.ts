import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PokemonList, PokemonType, Result } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PokemonService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public getAllTypes(): Observable<Result<PokemonType>> {
    const url = `${this.getApiUrl()}type`;

    return this.http.get(url, { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public getByType(type: string): Observable<Result<PokemonList>> {
    const url = `${this.getApiUrl()}type/${type}`;

    return this.http.get(url, { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        const result: Result<PokemonList> = {
          count: res.pokemon.length,
          next: null,
          previous: null,
          results: res.pokemon,
        };

        return result;
      })
    );
  }
}
