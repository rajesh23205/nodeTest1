import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { FindRoommateRoutingModule } from './find-roommate.routing.module';
import { FindRoommateComponent } from './find-roommate.component';
import { SharedModule } from '../shared/shared.module';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    FindRoommateComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    CalendarModule,
    ReactiveFormsModule,
    FormsModule,
    FindRoommateRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: []
})

export class FindRoommateModule { }
