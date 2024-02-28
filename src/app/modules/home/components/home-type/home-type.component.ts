import { environment } from 'src/environments/environment';

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, catchError, takeUntil, throwError, timeout } from 'rxjs';

import { BaseComponent } from 'src/app/shared/components/helpers/base-component/base.component';

import { PokemonList, PokemonListItem } from 'src/app/models';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home-type',
  templateUrl: './home-type.component.html',
  styleUrls: ['./home-type.component.scss'],
})
export class HomeTypeComponent extends BaseComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  protected isLoading = false;

  public pokemonList: PokemonList = {
    pokemon: [],
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {
    super();
  }

  protected type: string = '';

  pageSize: number = 10; // Número de itens por página
  currentPage: number = 1; // Página atual

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if (params) {
        this.type = params.type;
        this.getByType(this.type);
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private async getByType(type: string) {
    this.isLoading = true;

    this.pokemonService
      .getByType(type)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        timeout(30000) /* 30 seconds */,
        catchError((error: any) => {
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (res) => {
          if (!res) console.error('Error');
          else {
            res.results.forEach((item: any) => {
              const pokemonItem: PokemonListItem = {
                name: item.pokemon.name,
                url: item.pokemon.url,
                slot: item.slot,
                spriteUrl: this.concatPokemonImageUrl(item.pokemon.url),
              };

              this.pokemonList.pokemon.push(pokemonItem);
            });
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err.message == 'Timeout has occurred')
            console.error(
              'Desculpe, ocorreu um problema temporário durante a solicitação. Por favor, tente novamente mais tarde.'
            );
          else console.error(err.message);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  private extractPokemonId(url: string): number {
    const regex = /\/(\d+)\//;

    const match = url.match(regex);

    if (match && match[1]) {
      return parseInt(match[1]);
    } else {
      return -1;
    }
  }

  private concatPokemonImageUrl(url: string) {
    return `${this.blobBaseUrl}/${this.extractPokemonId(url)}.png`;
  }

  protected get paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    return this.pokemonList.pokemon.slice(startIndex, endIndex);
  }

  protected onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  protected navigateToHome() {
    this.router.navigate(['home']);
  }
}
