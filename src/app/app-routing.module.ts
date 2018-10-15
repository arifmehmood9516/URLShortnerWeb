import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UrlsComponent }  from './urls/urls.component';
import { UrldetailsComponent }  from './urldetails/urldetails.component';


const routes: Routes = [
  { path: '', redirectTo: '/urls', pathMatch: 'full' },
  { path: 'urls', component:UrlsComponent },
  { path: 'urldetails/:id', component:UrldetailsComponent}
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
