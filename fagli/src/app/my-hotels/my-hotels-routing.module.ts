import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyHotelsComponent } from './my-hotels.component';

const routes: Routes = [
  { path: 'myHotels/:userId', component: MyHotelsComponent },
  { path: 'profile/:userId',   redirectTo: '/profile/:userId', pathMatch: 'full' },
  { path: 'registerHotel',   redirectTo: '/registerHotel', pathMatch: 'full' },
  { path: 'findHotel',   redirectTo: '/findHotel', pathMatch: 'full' },
  { path: 'myHotels/:userId',   redirectTo: '/myHotels/:userId', pathMatch: 'full' },
  { path: 'hotelDetails/:hotelId/:userId',   redirectTo: '/hotelDetails/:hotelId/:userId', pathMatch: 'full' },
  { path: '**', redirectTo: '/errorPage', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MyHotelRoutingModule { }
