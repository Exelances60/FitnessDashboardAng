import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-table-search',
  templateUrl: './table-search.component.html',
  styleUrl: './table-search.component.css',
})
export class TableSearchComponent {
  searchValue = '';
  @Output() search = new EventEmitter<string>();
  @Output() reset = new EventEmitter<string>();
  constructor() {}

  onSearch(): void {
    this.search.emit(this.searchValue);
  }
  onReset(): void {
    this.searchValue = '';
    this.search.emit(this.searchValue);
  }
}
