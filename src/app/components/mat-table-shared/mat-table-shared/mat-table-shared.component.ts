import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VisibleColumns } from '../visible-columns';

@Component({
  selector: 'sc-mat-table-shared',
  templateUrl: './mat-table-shared.component.html',
  styleUrls: ['./mat-table-shared.component.css']
})
export class MatTableSharedComponent implements OnInit,OnChanges {
  @Input () data:any[]=[]; 
  @Input () title:string=''; 
  @Input () visibleColumns: VisibleColumns[]=[]; 
  dataSource: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  constructor() { }

  ngOnInit(): void {}

  ngOnChanges() {
     this.dataSource = new MatTableDataSource(this.data);
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
  }   
// -----------------------------------------------------------------------------------------------------
// @ Metodos publicos
// -----------------------------------------------------------------------------------------------------
  get displayedColumns(): string[] {
    return this.visibleColumns.map((c) => c.key);
  }

}

