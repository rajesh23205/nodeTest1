import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { ImageCropperComponent } from './component/image-cropper/image-cropper.component';
import { ImageUploaderComponent } from './component/image-uploader/image-uploader.component';

import { SubjectSharedService } from './services/subject.service';
import { ApiService } from './services/api.service';
import { DataService } from './services/data.service';
import { CommonUtils } from './services/commonUtils.service';
import { SignupComponent } from './component/signup/signup.component';
import { LoginComponent } from './component/login/login.component';
import { PageFilterComponent } from './component/page-filter/page-filter.component';
import { SuccessErrorMsgComponent } from './component/success-error-msg/success-error-msg.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ImageCropperComponent,
    ImageUploaderComponent,
    SignupComponent,
    LoginComponent,
    PageFilterComponent,
    SuccessErrorMsgComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ImageCropperModule
  ],
  providers: [
    SubjectSharedService,
    ApiService,
    DataService,
    CommonUtils
  ],
  exports: [
    HeaderComponent,
    ImageCropperComponent,
    ImageUploaderComponent,
    SignupComponent,
    LoginComponent,
    PageFilterComponent,
    SuccessErrorMsgComponent
  ],
})
export class SharedModule { }
