import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeListComponent } from './components/home-list/home-list.component';
import { HomeTypeComponent } from './components/home-type/home-type.component';

const routes: Routes = [
  {
    path: '',
    component: HomeListComponent,
    children: [],
  },
  {
    path: 'pokemon-type/:type',
    component: HomeTypeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
