import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SelectModel } from 'src/app/core/models/select-model';

@Component({
  selector: 'sc-single-selection',
  templateUrl: './single-selection.component.html',
  styleUrls: ['./single-selection.component.css']
})
export class SingleSelectionComponent implements OnInit {
  /** Label of the search placeholder */
  @Input() placeholderLabel = 'Suche';

  @Input() selection:SelectModel[]=[];
  selectionClone:SelectModel[]=[];

  /** Label to be shown when no entries are found. Set to null if no message should be shown. */
  //@Input() noEntriesFoundLabel = 'Keine Optionen gefunden';

  /** Reference to the search input field */
  // @ViewChild('searchSelectInput', {read: ElementRef}) searchSelectInput!: ElementRef;

  /** Current search value */
  // get value(): string {
  //   return this._value;
  // }
  // private _value: string='';

  constructor() { }

  ngOnInit(): void {
    this.selectionClone = this.selection
  }

  search(event: Event){
    let value1 = (event.target as HTMLInputElement).value;
    this.selection = this.select(value1)
    // result.length>=1
    //   ? this.selection = result
    //   : this.selection = this.selectionClone
  }

  private select(query: string):SelectModel[]{
    let result: SelectModel[] = [];
    for(let a of this.selection){
      if(a.descripcion.toLowerCase().indexOf(query) > -1){
        result.push(a)
      }
    }
    return result
  }
  //TODO: Limpiar el input
  clean(inputFilter:any){
    inputFilter.value = '';
    this.selection = this.selectionClone;
  }
}
