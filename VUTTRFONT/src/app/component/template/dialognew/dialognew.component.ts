import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Tool } from 'src/app/tool.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import {MatChipInputEvent} from '@angular/material/chips';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialognew',
  templateUrl: './dialognew.component.html',
  styleUrls: ['./dialognew.component.css']
})

export class DialognewComponent implements OnInit {  
  //Separador de tags, e vetor de tags
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];
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
    this.router.navigate(['newTool']);
  }
  //Método o qual pega os atributos de fraamenta e joga a classe de volta
  //para o componente que realiza o cadastro chamando a classe de serviço
  saveTool(): void {
    this.tool.tags = this.tags;
    console.log(this.tool);
    this.router.navigate(['']);
    this.dialogRef.close(this.tool);
  }
  //Método o qual fecha o app
  cancel(): void {
    this.router.navigate(['']);
    this.dialogRef.close();
  }
  //Método para as tags
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our tag
    if (value) {
      this.tags.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();

  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
  
}
