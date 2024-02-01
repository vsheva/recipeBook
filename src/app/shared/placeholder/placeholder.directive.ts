import {Directive, ViewContainerRef} from '@angular/core';

//помещаем в auth.html
@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}

}
