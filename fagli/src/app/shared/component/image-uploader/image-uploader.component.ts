import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {

  @Output() cameraIconClicked = new EventEmitter<boolean>();
  @Input() imageUrl: String;
  @Input() isImage: Boolean = false;

  constructor() { }

  ngOnInit() {
  }

  cameraClickHandler() {
    this.cameraIconClicked.emit(true);
  }

}
