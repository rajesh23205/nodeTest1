import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AllRequestRoutingModule } from './all-request-detail.routing.module';
import { AllRequestDetailComponent } from './all-request-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AllRequestDetailComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AllRequestRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: []
})

export class AllRequestModule { }
