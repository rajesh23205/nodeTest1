import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindRoommateComponent } from './find-roommate.component';

const routes: Routes = [
  { path: 'findRoommate/:hotelId/:userId', component: FindRoommateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FindRoommateRoutingModule { }
