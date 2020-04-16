import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { RegisterHotelRoutingModule } from './register-hotel-routing.module';
import { RegisterHotelComponent } from './register-hotel.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RegisterHotelComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RegisterHotelRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: []
})

export class RegisterHotelModule { }
