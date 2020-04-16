import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { FindHotelRoutingModule } from './find-hotel-routing.module';
import { FindHotelComponent } from './find-hotel.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FindHotelComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    FindHotelRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: []
})

export class FindHotelModule { }
