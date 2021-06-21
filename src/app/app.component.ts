import { Component } from '@angular/core';

@Component({
  selector: 'fbc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fbc-brisbane2021';

  updateTitle(event: Event) {
    console.log(event);
  }
}

