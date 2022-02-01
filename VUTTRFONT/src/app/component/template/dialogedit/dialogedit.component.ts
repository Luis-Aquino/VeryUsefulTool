import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Tool } from 'src/app/tool.model';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialogedit',
  templateUrl: './dialogedit.component.html',
  styleUrls: ['./dialogedit.component.css']
})
//Classe/componente de diálogo para modificação de ferramenta
export class DialogeditComponent implements OnInit {
  //Separador de tags, contorle para as tags, e vetor de tags
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  tags: string[] = [];
  
  tool: Tool = {
    title: "",
    link: "",
    description: "",
    tags: [],
  }
  //Contrutor da classe que recebe a ferramenta selecionada, para alterá-la
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Tool,
    public dialogRef: MatDialogRef<DialogeditComponent>,
    private router: Router,
  ) { }

  //Método de início da classe, onde existe a mudança de rota a atribuição da ferramenta no
  //novo componente e a atribuição do vetor de tags aos chips do angular meterials
  ngOnInit(): void {
     this.router.navigate(['editTool']);
     this.tool = this.data;
     this.tags = this.data.tags;
  }
  //Metodo/função para modificar a ferramenta recebida pelo component cardsrcnadd quando
  //clicado o botão Modify Tool
  modifyTool(): void{
    this.tool.tags = this.tags;
    console.log(this.tool);
    this.router.navigate(['']);
    this.dialogRef.close(this.tool);
  }
  //Metodo/função para adiciononar uma tag ao campo de tags do formulário, 
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    //Adicioana a nossa tag
    if (value) {
      this.tags.push(value);
    }
    //Limpa o valor de Input
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
  }
  //Método/função seja clicado o botão de remover no chips
  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
  //Método/função para canelar a opeção de remmover a ferramenta
  cancel(): void {
    this.router.navigate(['']);
    this.dialogRef.close();
  }

}
