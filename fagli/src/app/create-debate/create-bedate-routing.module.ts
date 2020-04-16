import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateDebateComponent } from './create-debate.component';

const routes: Routes = [
  { path: 'createDebate', component: CreateDebateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CreateDebateRoutingModule { }
