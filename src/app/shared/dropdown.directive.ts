import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}
}



// export class DropdownDirective {
//   @HostBinding("class.open") isOpened = false;
//   @HostListener("click")  toggleOpen() {
//   this.isOpened = !this.isOpened;
//   }
//  constructor() { }
// }
