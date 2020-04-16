import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  { path: 'profile/:userId', component: ProfileComponent },
  { path: 'registerHotel',   redirectTo: '/registerHotel', pathMatch: 'full' },
  { path: 'findHotel',   redirectTo: '/findHotel', pathMatch: 'full' },
  { path: 'myHotels/:userId',   redirectTo: '/myHotels/:userId', pathMatch: 'full' },
  { path: 'hotelDetails/:hotelId/:userId',   redirectTo: '/hotelDetails/:hotelId/:userId', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/errorPage', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
