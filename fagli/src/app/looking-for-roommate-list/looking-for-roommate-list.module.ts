import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { LookingForRoommateListRoutingModule } from './looking-for-roommate-list.routing.module';
import { LookingForRoommateListComponent } from './looking-for-roommate-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LookingForRoommateListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LookingForRoommateListRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: []
})

export class LookingForRoommateListModule { }
