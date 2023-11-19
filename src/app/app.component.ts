//"styles": [
//               "src/styles.css"
//             ],

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 loadedFeater = "recipe";

  onSelect(feature: string) {
this.loadedFeater = feature;
  }
}
