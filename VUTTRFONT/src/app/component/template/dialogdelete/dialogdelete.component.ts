import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogdelete',
  templateUrl: './dialogdelete.component.html',
  styleUrls: ['./dialogdelete.component.css']
})
export class DialogdeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogdeleteComponent>,
  ) { }

  ngOnInit(): void {
  }
  cancel(): void {
    this.dialogRef.close();
  }
  remove(): void{
    this.dialogRef.close(true);
  }
}
