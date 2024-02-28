import { Component, Input, OnInit } from '@angular/core';

import { PokemonListItem } from 'src/app/models';

@Component({
  selector: 'app-home-type-card',
  templateUrl: './home-type-card.component.html',
  styleUrls: ['./home-type-card.component.scss'],
})
export class HomeTypeCardComponent implements OnInit {
  @Input() type: string = '';
  @Input() pokemon: PokemonListItem = {
    name: '',
    slot: 0,
    spriteUrl: '',
    url: '',
  };

  ngOnInit() {
    this.isValidImage(this.pokemon.spriteUrl)
      .then((isValid) => {
        if (!isValid) this.pokemon.spriteUrl = 'assets/svg/unknown-pokemon.svg';
      })
      .catch((error) => {
        console.error(
          'It seems an error occurred while checking the image.:',
          error
        );
      });
  }

  isValidImage(url: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }
}
