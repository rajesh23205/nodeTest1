import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { CreateDebateModule } from './create-debate/create-debate.module';
import { SharedModule } from './shared/shared.module';
import { RegisterHotelModule } from './register-hotel/register-hotel.module';
import { FindHotelModule } from './find-hotel/find-hotel.module';
import { HotelDetailsModule } from './hotel-details/hotel-details.module';
import { ProfileModule } from './profile/profile.component.module';
import { FindRoommateModule } from './find-roommate/find-roommate.module';
import { LookingForRoommateListModule } from './looking-for-roommate-list/looking-for-roommate-list.module';
import { ErrorPageModule } from './error-page/error-page.module';
import { NotificationModule } from './notification/notification.component.module';
import { CurrentRequestModule } from './current-request-detail/current-request-detail.module';
import { AllRequestModule } from './all-request-detail/all-request-detail.module';
import { MyHotelModule } from './my-hotels/my-hotels.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    HomeModule,
    CreateDebateModule,
    AppRoutingModule,
    RegisterHotelModule,
    FindHotelModule,
    HotelDetailsModule,
    ProfileModule,
    FindRoommateModule,
    LookingForRoommateListModule,
    NotificationModule,
    CurrentRequestModule,
    AllRequestModule,
    MyHotelModule,
    ErrorPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
