import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, catchError, takeUntil, throwError, timeout } from 'rxjs';

import { EPokemonType } from 'src/app/shared/enum';

import { PokemonType } from 'src/app/models';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss'],
})
export class HomeListComponent implements OnInit {
  protected isLoading = false;

  public typeList: PokemonType[] = [];
  public EnumPokemonTypes = [
    { name: 'normal', url: EPokemonType.Normal },
    { name: 'fighting', url: EPokemonType.Fighting },
  ];

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private router: Router, private pokemonService: PokemonService) {}

  async ngOnInit() {
    this.getAllTypes();
  }

  async getAllTypes() {
    this.isLoading = true;

    this.pokemonService
      .getAllTypes()
      .pipe(
        takeUntil(this.ngUnsubscribe),
        timeout(30),
        catchError((error: any) => {
          return throwError(() => error);
        })
      )
      .subscribe({
        next: async (res) => {
          if (!res) console.error('Error');
          else {
            this.typeList = res.results.map((type) => ({
              ...type,
              assetPath:
                this.EnumPokemonTypes.find(
                  (enumType) => enumType.name === type.name
                )?.url ?? '',
            }));

            console.log(this.typeList);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
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

  public finishOnboarding() {
    this.router.navigate(['/type']);
  }
}
