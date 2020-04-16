import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllRequestDetailComponent } from './all-request-detail.component';

const routes: Routes = [
  { path: 'allRequest/:userId', component: AllRequestDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AllRequestRoutingModule { }
