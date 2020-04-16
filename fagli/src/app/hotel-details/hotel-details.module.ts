import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { HotelDetailsRoutingModule } from './hotel-details.routing.module';
import { HotelDetailsComponent } from './hotel-details.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HotelDetailsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HotelDetailsRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: []
})

export class HotelDetailsModule { }
