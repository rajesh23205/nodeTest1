import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LookingForRoommateListComponent } from './looking-for-roommate-list.component';

const routes: Routes = [
  { path: 'lookingForRoommateList/:hotelId', component: LookingForRoommateListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LookingForRoommateListRoutingModule { }
