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
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  private EnumPokemonTypes = [
    {
      name: 'normal',
      url: EPokemonType.Normal,
      description:
        'Normal-type Pokémon are versatile and have no elemental weaknesses. They are known for their adaptability and ability to learn a wide variety of moves.',
    },
    {
      name: 'fighting',
      url: EPokemonType.Fighting,
      description:
        'Fighting-type Pokémon are experts in physical combat, using powerful punches and martial arts techniques. They are strong against Normal, Rock, Ice, Dark, and Steel-type Pokémon.',
    },
    {
      name: 'flying',
      url: EPokemonType.Flying,
      description:
        'Flying-type Pokémon are agile and capable of flying through the sky. They are often used for transportation and exploration. They are weak against Electric, Ice, and Rock-type attacks.',
    },
    {
      name: 'poison',
      url: EPokemonType.Poison,
      description:
        'Poison-type Pokémon use toxins and harmful substances to defeat their opponents. They are effective against Grass and Fairy-type Pokémon, but vulnerable to Psychic and Ground-type attacks.',
    },
    {
      name: 'ground',
      url: EPokemonType.Ground,
      description:
        'Ground-type Pokémon are masters of the earth and soil. They are strong against Electric, Fire, Poison, Rock, and Steel-type Pokémon, but vulnerable to Water, Ice, and Grass-type attacks.',
    },
    {
      name: 'rock',
      url: EPokemonType.Rock,
      description:
        'Rock-type Pokémon are resilient and have a solid defense. They are effective against Fire, Ice, Flying, and Bug-type Pokémon, but vulnerable to Fighting, Ground, Water, and Grass-type attacks.',
    },
    {
      name: 'bug',
      url: EPokemonType.Bug,
      description:
        'Bug-type Pokémon are known for their adaptability and rapid reproduction. They are effective against Grass, Psychic, and Dark-type Pokémon, but vulnerable to Fire, Flying, and Rock-type attacks.',
    },
    {
      name: 'ghost',
      url: EPokemonType.Ghost,
      description:
        'Ghost-type Pokémon are mysterious and have supernatural abilities. They are effective against Psychic and Ghost-type Pokémon, but vulnerable to Dark-type attacks.',
    },
    {
      name: 'steel',
      url: EPokemonType.Steel,
      description:
        'Steel-type Pokémon are made of metal and have solid defenses. They are resistant to Normal, Ice, Flying, and Psychic-type attacks, but vulnerable to Fire, Fighting, and Ground-type attacks.',
    },
    {
      name: 'fire',
      url: EPokemonType.Fire,
      description:
        'Fire-type Pokémon have blazing flames and are known for their passion and destructive power. They are effective against Grass, Ice, Bug, and Steel-type Pokémon, but vulnerable to Water, Rock, and Ground-type attacks.',
    },
    {
      name: 'water',
      url: EPokemonType.Water,
      description:
        'Water-type Pokémon are masters of the oceans and rivers. They are effective against Fire, Ground, and Rock-type Pokémon, but vulnerable to Electric and Grass-type attacks.',
    },
    {
      name: 'grass',
      url: EPokemonType.Grass,
      description:
        'Grass-type Pokémon are known for their vitality and regeneration abilities. They are effective against Water, Ground, and Rock-type Pokémon, but vulnerable to Fire, Ice, Poison, Flying, and Bug-type attacks.',
    },
    {
      name: 'electric',
      url: EPokemonType.Electric,
      description:
        'Electric-type Pokémon have electricity running through their bodies. They are effective against Flying and Water-type Pokémon, but vulnerable to Ground-type attacks.',
    },
    {
      name: 'psychic',
      url: EPokemonType.Psychic,
      description:
        'Psychic-type Pokémon have mental powers and telepathic abilities. They are effective against Fighting and Poison-type Pokémon, but vulnerable to Bug, Ghost, and Dark-type attacks.',
    },
    {
      name: 'ice',
      url: EPokemonType.Ice,
      description:
        'Ice-type Pokémon are made of ice and have control over the cold. They are effective against Grass, Ground, Flying, and Dragon-type Pokémon, but vulnerable to Fire, Fighting, Rock, and Steel-type attacks.',
    },
    {
      name: 'dragon',
      url: EPokemonType.Dragon,
      description:
        'Dragon-type Pokémon are powerful and have impressive strength. They are effective against other Dragon-type Pokémon, but vulnerable to Ice, Dragon, and Fairy-type attacks.',
    },
    {
      name: 'dark',
      url: EPokemonType.Dark,
      description:
        'Dark-type Pokémon are mysterious and have a dark side. They are effective against Psychic and Ghost-type Pokémon, but vulnerable to Fighting, Bug, and Fairy-type attacks.',
    },
    {
      name: 'fairy',
      url: EPokemonType.Fairy,
      description:
        'Fairy-type Pokémon have a magical aura and healing powers. They are effective against Fighting, Dragon, and Dark-type Pokémon, but vulnerable to Poison and Steel-type attacks.',
    },
    {
      name: 'unknown',
      url: EPokemonType.Unknown,
      description:
        'Unknown-type Pokémon are enigmatic and little is known about them. Their abilities and weaknesses are a mystery.',
    },
    {
      name: 'shadow',
      url: EPokemonType.Shadow,
      description:
        'Shadow-type Pokémon are dark and sinister, with hidden powers. They are rare and difficult to find, and their intentions are obscure.',
    },
  ];

  protected isLoading = false;

  public typeList: PokemonType[] = [];

  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit() {
    this.getAllTypes();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private async getAllTypes() {
    this.isLoading = true;

    this.pokemonService
      .getAllTypes()
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
            this.typeList = res.results.map((type) => ({
              ...type,
              assetPath:
                this.EnumPokemonTypes.find(
                  (enumType) => enumType.name === type.name
                )?.url ?? '',
              description:
                this.EnumPokemonTypes.find(
                  (enumType) => enumType.name == type.name
                )?.description ?? '',
            }));
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

  protected navigateToType(type: string) {
    this.router.navigate(['home', 'pokemon-type', type]);
  }
}
