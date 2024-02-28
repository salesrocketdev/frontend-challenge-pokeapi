import { Component, EventEmitter, Input, Output } from '@angular/core';

import { PokemonType } from 'src/app/models';

@Component({
  selector: 'app-home-list-card',
  templateUrl: './home-list-card.component.html',
  styleUrls: ['./home-list-card.component.scss'],
})
export class HomeListCardComponent {
  @Input() type: PokemonType = {
    assetPath: '',
    description: '',
    name: '',
    url: '',
  };

  @Output() navigateToTypeEvent = new EventEmitter();

  public navigateToType(type: string) {
    this.navigateToTypeEvent.emit(type);
  }
}
