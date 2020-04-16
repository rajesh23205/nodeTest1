import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { NotificationRoutingModule } from './notification.component.routing.module';
import { NotificationComponent } from './notification.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NotificationRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: []
})

export class NotificationModule { }
