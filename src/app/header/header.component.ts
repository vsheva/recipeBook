import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  collapsed = true;
 @Output() selectedFeature = new EventEmitter<string>();

  onChoose(feature: string) {
   this.selectedFeature.emit(feature);// which is "recipe"/"shopping-list"
  }
}
