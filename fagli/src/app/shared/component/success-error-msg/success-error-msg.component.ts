import { Component, OnInit } from '@angular/core';
import { SubjectSharedService } from '../../services/subject.service';
// import { ApiService } from '../../services/api.service';
// import { MustMatch } from '../../services/must-match.validator';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-success-error-msg',
  templateUrl: './success-error-msg.component.html',
  styleUrls: ['./success-error-msg.component.scss']
})
export class SuccessErrorMsgComponent implements OnInit {

  headerText: String = '';
  bodyText: String = '';
  showPopup: Boolean = false;
  isSuccess: Boolean = true;

  constructor(
    private subjectShareService: SubjectSharedService
  ) {
    this.subjectShareService.successError$.subscribe((popupData: Boolean) => {
      this.showPopup = true;
      this.isSuccess = popupData['success'];
      this.headerText = popupData['header'];
      this.bodyText = popupData['body'];
      setTimeout(() => {
        this.showPopup = false;
    }, 3000);
      // $('#signUpModal').modal('show');
    });
   }

  ngOnInit() {
  }

}
