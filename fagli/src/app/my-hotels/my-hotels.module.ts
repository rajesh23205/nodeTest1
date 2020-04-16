import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { MyHotelsComponent } from './my-hotels.component';
import { MyHotelRoutingModule } from './my-hotels-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MyHotelsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MyHotelRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: []
})

export class MyHotelModule { }
