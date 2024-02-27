import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeListComponent } from './components/home-list/home-list.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeTypeComponent } from './components/home-type/home-type.component';

@NgModule({
  declarations: [HomeListComponent, HomeTypeComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
