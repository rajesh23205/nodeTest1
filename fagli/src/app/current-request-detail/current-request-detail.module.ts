import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { CurrentRequestRoutingModule } from './current-request-detail.router.module';
import { CurrentRequestDetailComponent } from './current-request-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CurrentRequestDetailComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CurrentRequestRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: []
})

export class CurrentRequestModule { }
