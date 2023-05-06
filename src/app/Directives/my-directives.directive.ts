import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: '[appMyDirectives]'
})
export class MyDirectivesDirective {

  constructor(private el:ElementRef) {
    console.log(el)
    this.el.nativeElement.style.backgroundColor="red"
    // this.el.nativeElement.style.hover.backgroundColor="green"
   }

}
