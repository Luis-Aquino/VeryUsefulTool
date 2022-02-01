import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialogremove',
  templateUrl: './dialogremove.component.html',
  styleUrls: ['./dialogremove.component.css']
})
//Classe/componente para o diálogo de deleção de ferramenta
export class DialogremoveComponent implements OnInit {
  //Referência do próprio diálogo
  constructor(
    public dialogRef: MatDialogRef<DialogremoveComponent>,
    private router: Router,
  ) { }
  //Método/função para iniciar o componente e redirecionar para a rota desejada
  ngOnInit(): void {
    this.router.navigate(['removeTool']);
  }
  //Fecha o diálogo e retorna false, para não deletar a ferramenta
  cancel(): void {
    this.router.navigate(['']);
    this.dialogRef.close(false);
  }
  //Fecha o diálogo e retorna true, para que a ferramenta seja deletada
  remove(): void{
    this.router.navigate(['']);
    this.dialogRef.close(true);
  }
  
}
