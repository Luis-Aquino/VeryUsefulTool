import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Tool } from 'src/app/tool.model';
import { ToolService } from 'src/app/component/service/tool.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialognew',
  templateUrl: './dialognew.component.html',
  styleUrls: ['./dialognew.component.css']
})
export class DialognewComponent implements OnInit {
  @Input() tools : Tool[] = [];
  
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

  
  constructor(
    public dialogRef: MatDialogRef<DialognewComponent>,
    private service: ToolService,
    private router: Router,
  ) {  
 }

  ngOnInit(): void {

  }
  saveTool(): void {
    this.tool.tags = this.tags;
    console.log(this.tool);
    this.service.create(this.tool).subscribe(() =>{
      this.service.showMessage("Tool created with Success!");
      this.router.navigate(['']);
    },
    err => {
      this.service.showMessage("It was not possible to create tool.")
    });
    this.cancel();
  }

  cancel(): void {
    this.dialogRef.close();
    /*this.toolForm.reset()*/
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

}
