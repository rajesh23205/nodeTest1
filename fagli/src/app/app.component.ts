import { Component } from '@angular/core';
import { SubjectSharedService } from '../app/shared/services/subject.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fagli';
  showLoader: Boolean = false;

  constructor(
    private subjectShareService: SubjectSharedService
  ) {
    this.subjectShareService.loader$.subscribe((userData) => {
      this.showLoader = userData;
    });
  }
}
