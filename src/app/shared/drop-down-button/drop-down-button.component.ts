import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {BUTTON_ID} from '../filter-bar/filter-bar.component';
import {Observable} from 'rxjs';
import {MultiSelectListComponent} from '../multi-select-list/multi-select-list.component';

@Component({
  selector: 'app-drop-down-button',
  templateUrl: './drop-down-button.component.html',
  styleUrls: ['./drop-down-button.component.css']
})
export class DropDownButtonComponent implements OnInit, OnDestroy {

  @Input()
  id: BUTTON_ID;

  @Input()
  dropDownMargin = "60px";

  @ViewChild('search_bar') sb: ElementRef;

  @ViewChild('selection_list') sl: MultiSelectListComponent;

  activeSelection = false;
  selected = false;
  protected searchString = "";

  protected selectedOpts : {[key:string]: boolean} = {};

  @Input("selection")
  get selection() {
    return this.selectedOpts;
  }

  @Output("selection") 
  selectedChange = new EventEmitter<{[key:string]: boolean}>();
  set selection(opts: {[key:string]: boolean}) {
    if (opts) {
      this.selected = !! Object.entries(opts).length;
      this.selectedOpts = opts;
      this.selectedChange.emit(this.selectedOpts);
    }
  }

  protected existingSelection = false;

  @Input()
  opts$ : Observable<string[]>;

  @Input()
  onOptSelected = (id: BUTTON_ID, selctedOpts: string[]) => {};


  private _closeBinded = this.closeDropDown.bind(this);
  protected closeDropDown(e: Event) {
    this.activeSelection = false;
    this.selection = (this.sl) ? this.sl.selected : undefined;
    this.onOptSelected(this.id, Object.keys(this.selectedOpts));
    window.removeEventListener('click', this._closeBinded);
    e.stopPropagation();
  }

  protected sinkClickEvents(e: Event) {
    e.stopPropagation();
  }

  protected getSelection(): string[] {
    return Object.keys(this.selectedOpts)
  }

  protected onButtonClick(event: Event) {
    this.activeSelection = true;

    // delay focusing the element & allow element to render
    setTimeout(() => {
      if (this.activeSelection && this.sb.nativeElement) {
        this.sb.nativeElement.focus();
      }
      // register close listener
      window.addEventListener('click', this._closeBinded);
    });
  }

  protected onApplyClick(event: Event) {
    this.closeDropDown(event);
  }

  protected onClearClick(event: Event) {
    // clear selection
    this.selection = {};
    event.stopPropagation();
  }

  constructor() {

  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    window.removeEventListener('click', this._closeBinded);
  }


}