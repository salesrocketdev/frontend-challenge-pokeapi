import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';

import { HomeListComponent } from './components/home-list/home-list.component';
import { HomeTypeComponent } from './components/home-type/home-type.component';

import { HomeListCardComponent } from './components/home-list/home-list-card/home-list-card.component';
import { HomeTypeCardComponent } from './components/home-type/home-type-card/home-type-card.component';

@NgModule({
  declarations: [
    HomeListComponent,
    HomeTypeComponent,
    HomeListCardComponent,
    HomeTypeCardComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
