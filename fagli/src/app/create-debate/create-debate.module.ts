import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateDebateRoutingModule } from './create-bedate-routing.module';
import { CreateDebateComponent } from './create-debate.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CreateDebateComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    CreateDebateRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: []
})

export class CreateDebateModule { }
