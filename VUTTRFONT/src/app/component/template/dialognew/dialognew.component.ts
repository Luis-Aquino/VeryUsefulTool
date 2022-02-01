import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Tool } from 'src/app/tool.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {MatChipInputEvent} from '@angular/material/chips';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialognew',
  templateUrl: './dialognew.component.html',
  styleUrls: ['./dialognew.component.css']
})
export class DialognewComponent implements OnInit {  
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags!: Observable<string[]>;
  tags: string[] = [];
  form!: FormGroup;


  tool: Tool = {
    title: "",
    link: "",
    description: "",
    tags: [],
  }
  
  constructor(
    public dialogRef: MatDialogRef<DialognewComponent>,
    private router: Router,
  ) { }
  //Navega para /newTool quanto iniciado
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });
    this.router.navigate(['newTool']);
  }
  saveTool(): void {
    this.tool.tags = this.tags;
    console.log(this.tool);
    this.router.navigate(['']);
    this.dialogRef.close(this.tool);
  }

  cancel(): void {
    this.router.navigate(['']);
    this.dialogRef.close();
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
  
}
