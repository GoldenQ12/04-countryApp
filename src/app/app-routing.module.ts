import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: HomePageComponent
  // },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  {
    path: 'countries',
    loadChildren: () => import('./countries/countries.module').then( module => module.CountriesModule ) // * A function that receives an import then loads the countriesModule if it works
  },
  {
    path: '**',
    redirectTo: 'countries/by-capital'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,

  ]
})
export class AppRoutingModule { }
