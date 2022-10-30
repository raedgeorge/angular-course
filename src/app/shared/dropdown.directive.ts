import {Directive, ElementRef, HostBinding, HostListener, OnInit} from "@angular/core";

@Directive({
  selector: '[appDropDown]'
})
export  class DropdownDirective implements OnInit{

  @HostBinding('class.open') isOpen = false;

  @HostListener('document:click', ['$event']) toggleMenu(event: Event){
    this.isOpen = this.elementRef
                      .nativeElement
                      .contains(event.target) ? !this.isOpen : false;
  }

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(){

  }
}
