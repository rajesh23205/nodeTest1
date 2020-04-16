import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { SubjectSharedService } from '../../services/subject.service';
declare var $: any;


@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  // @Input() imageUrl: String;
  private isImage: Boolean = false;
  @Input() imageUrl: String = '';
  @Output() updateImageUrlEvent = new EventEmitter<String>();

  constructor(
    private subjectShareService: SubjectSharedService
  ) {
    this.subjectShareService.imageCropper$.subscribe((show: Boolean) => {
      $('#imageCropperModal').modal('show');
    });
  }

  ngOnInit() {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.imageUrl = this.croppedImage;
    this.isImage = true;
  }
  saveEditedImage() {
    this.updateImageUrlEvent.emit(this.croppedImage);
    document.getElementById('imageCropperModal');
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  showModal() {
    // document.getElementById('imageCropperModal');
    // console.log('sdd');
    $('#imageCropperModal').modal('show');
  }
  // cameraIconClicked() {
  //   console.log('cameraIconClicked');
  // }

}
