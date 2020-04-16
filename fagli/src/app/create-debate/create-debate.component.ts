import { Component, OnInit } from '@angular/core';
import { SubjectSharedService } from '../shared/services/subject.service';
declare var $: any;

@Component({
  selector: 'app-create-debate',
  templateUrl: './create-debate.component.html',
  styleUrls: ['./create-debate.component.scss']
})
export class CreateDebateComponent implements OnInit {

  // private showImageCropper: Boolean = false;
  public imageUrl: String = '';
  public isImage: Boolean = false;

  constructor(
    private subjectShareService: SubjectSharedService
  ) { }

  ngOnInit() {
  }

  updateImageUrl(imageUrl) {
    // console.log(event + 'event');
    if (imageUrl !== '') {
      this.imageUrl = imageUrl;
      this.isImage = true;
    }
  }

  showImageCropper() {
    this.subjectShareService.showImageCropper(true);
  }

  // showImageCropper() {
  //   // dfsdf sdfsd fsdf sdf dsf dsf df s
  // }

}
