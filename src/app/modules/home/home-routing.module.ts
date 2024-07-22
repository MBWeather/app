import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home.page';
import { LocationComponent } from 'src/app/@mbweather/components/location/location.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'location',
    component: LocationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
