import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { HotelDetailsComponent } from './hotel-details.component';

const routes: Routes = [
  { path: 'hotelDetails/:hotelId/:userId', component: HotelDetailsComponent, canActivate: [AuthGuard] },
  { path: 'profile/:userId',   redirectTo: '/profile/:userId', pathMatch: 'full' },
  { path: 'registerHotel',   redirectTo: '/registerHotel', pathMatch: 'full' },
  { path: 'findHotel',   redirectTo: '/findHotel', pathMatch: 'full' },
  { path: 'myHotels/:userId',   redirectTo: '/myHotels/:userId', pathMatch: 'full' },
  // { path: 'hotelDetails/:hotelId/:userId',   redirectTo: '/hotelDetails/:hotelId/:userId', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/errorPage', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HotelDetailsRoutingModule { }
