import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialognewComponent } from 'src/app/component/template/dialognew/dialognew.component'
import { Tool } from 'src/app/tool.model';
import { ToolService } from '../../service/tool.service';
@Component({
  selector: 'app-cardsrcnadd',
  templateUrl: './cardsrcnadd.component.html',
  styleUrls: ['./cardsrcnadd.component.css']
})

export class CardsrcnaddComponent implements OnInit {
  tools : Tool[] = [];
  searchType: boolean = false;
  stringSearch: string = "";

  constructor(
    public dialog: MatDialog,
    private service : ToolService,
  ) { }

  ngOnInit(): void {
    this.atualizarDados();
  }    

  atualizarDados(): void {
    this.service.findAll().subscribe(tools => {
      this.tools = tools
    })
  }
  addTool(): void {
    const dialogRef = this.dialog.open(DialognewComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  deleteTool(tool: Tool): void{
    this.service.delete(tool).subscribe(() =>  {
      this.service.showMessage("Tool Deleted with success");
      this.atualizarDados();
    });
  }
  //Lógica para buscar ferramenta de acordo com os parâmetros de seleção
  findTool(): void {
    if (this.searchType == false && this.stringSearch.length != 0){
      this.service.findByTitle(this.stringSearch).subscribe(tools => {
        this.tools = tools
      })
    }
    if (this.searchType == true && this.stringSearch.length != 0){
      this.service.findByTag(this.stringSearch).subscribe(tools => {
        this.tools = tools
      })
    }
    if (this.stringSearch.length == 0){
      this.atualizarDados();
    }

  }
  setSearch(): void{
    if (this.searchType == false)
      this.searchType = true;
    else
    this.searchType = false;
  }
}


