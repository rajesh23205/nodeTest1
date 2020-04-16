import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentRequestDetailComponent } from './current-request-detail.component';

const routes: Routes = [
  { path: 'currentRequest/:requestId', component: CurrentRequestDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CurrentRequestRoutingModule { }
