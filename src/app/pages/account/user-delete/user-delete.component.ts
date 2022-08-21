import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUserCreateDto } from '@coreinterfaces/user.interface';


@Component({
  selector: 'sc-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UserDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUserCreateDto) {}

    ngOnInit(): void {
      console.log('delete data:',this.data)
    }
    cancelar() {
      this.dialogRef.close();
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    confirmDelete(): void {
      //this.dataService.deleteIssue(this.data.id);
    }

}
