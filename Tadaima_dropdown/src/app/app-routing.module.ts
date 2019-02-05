import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StateSearchComponent }  from './state-search/state-search.component';

const routes: Routes = [
  { path: '', component:StateSearchComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
