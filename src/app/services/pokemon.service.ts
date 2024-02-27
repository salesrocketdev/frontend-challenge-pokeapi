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
    const url = this.getAppSettings() + 'type';

    return this.http.get(url, { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public getByType(type: string): Observable<PokemonList[]> {
    const url = this.getAppSettings() + `type/${type}?limit=10&offset=10`;

    return this.http.get(url, { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
