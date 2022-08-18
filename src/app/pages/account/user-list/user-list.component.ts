import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
//import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@core/services/auth.service';
import { User } from '@core/models/auth.model';
import { ApiResponseError } from '@core/models/api-response-error';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'sc-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email','acciones'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
   //======Error===============
  // errors: string[]=[];  
  // fieldNames:string[]=[];
  apiError!:ApiResponseError;
  //==========================
  constructor(
    //public dialog: MatDialog,
    private route: ActivatedRoute,
    private readonly srvUser: AuthService
  ) { }

  ngOnInit(): void {
    this.loadList();
  }

  private loadList(): void {
    this.dataSource.sort = this.sort;
    this.srvUser.getAll().subscribe( (resp:User[])=>{
       this.dataSource.data=resp
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
    },(error:HttpErrorResponse) =>{
      console.log(error)
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    //filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    if (this.dataSource.data.length) {
      this.dataSource.paginator!.firstPage();          
    }
    this.dataSource.filter = filterValue;
  }
  generate(){
      this.srvUser.getProfile()
          .subscribe( (resp:User) =>{
              // resp.isSuccess 
              //     ? this.notificationService.success('Movimientos generados con éxito') 
              //     : this.notificationService.error('No se lograron generar los movimientos')
          },(error:HttpErrorResponse)=>{
            this.apiError = new ApiResponseError().handlerCustomError(error);            
          });
  }
  manejarError(error:any) {
    if (error && error.error) {
      console.log(error);
    }
  }

  deleteRow(i:number,row:User){
    let index=i
    // const dialogo3 = this.dialog.open(GastosDeleteComponent, {
    //   data: row
    // });
    // dialogo3.afterClosed().subscribe(art => {
    //   if (art != undefined)
    //     this.eliminar(index,art);
    // });

  }
  private delete(index:number,result: User) { 
    //console.log('eliminar gasto '+index+'--------------'+result.IdEmpresa)
    // this.gastosService.delete(result.id).subscribe(resp=>{
    //   if(resp.isSuccess){
    //     this.removeAt(index)
    //     this.notificationService.success('Datos eliminados con éxito!');
    //   }else{
    //       this.notificationService.error('No se pudo eliminar el encuentro');
    //   }  
    // });    
  }
  removeAt(index: number) {
    const data = this.dataSource.data;
    data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);

    this.dataSource.data = data;
  }
}
