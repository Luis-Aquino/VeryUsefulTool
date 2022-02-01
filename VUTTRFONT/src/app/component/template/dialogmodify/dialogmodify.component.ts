import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Tool } from 'src/app/tool.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-dialogmodify',
  templateUrl: './dialogmodify.component.html',
  styleUrls: ['./dialogmodify.component.css']
})
export class DialogmodifyComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags!: Observable<string[]>;
  tags: string[] = [];
  
  tool: Tool = {
    title: "",
    link: "",
    description: "",
    tags: [],
  }

  @ViewChild('tagInput')
  tagInput!: ElementRef<HTMLInputElement>;
  router: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Tool,
    public dialogRef: MatDialogRef<DialogmodifyComponent>,
  ) { }

  ngOnInit(): void {
     this.tool = this.data;
     this.tags = this.data.tags;
  }
  modifyTool(): void{
    this.tool.tags = this.tags;
    console.log(this.tool);
    this.dialogRef.close(this.tool);
    this.router.navigate(['']);
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  cancel(): void {
    this.dialogRef.close();
    /*this.toolForm.reset()*/
  }

}
