import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CountriesComponent } from './countries/countries.component';
import {LoadingResolverService} from './loading-resolver.service';

const routes: Routes = [
  {path: '',component:HomeComponent,resolve:[LoadingResolverService]},
  {path:'countries',component:CountriesComponent,resolve:[LoadingResolverService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
