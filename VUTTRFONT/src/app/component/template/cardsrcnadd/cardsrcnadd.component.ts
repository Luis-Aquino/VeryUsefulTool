import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialognewComponent } from 'src/app/component/template/dialognew/dialognew.component'
import { Tool } from 'src/app/tool.model';
import { ToolService } from '../../service/tool.service';
import { DialogdeleteComponent } from '../dialogdelete/dialogdelete.component';
import { DialogmodifyComponent } from '../dialogmodify/dialogmodify.component';
@Component({
  selector: 'app-cardsrcnadd',
  templateUrl: './cardsrcnadd.component.html',
  styleUrls: ['./cardsrcnadd.component.css']
})

export class CardsrcnaddComponent implements OnInit {
  tools : Tool[] = [];
  searchType: boolean = false;
  stringSearch: string = "";
  delete: boolean = false;

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
      console.log(result);
      this.service.create(result).subscribe(() =>{
        this.service.showMessage("Tool created with Success!");
        this.atualizarDados();
      },
      err => {
        this.service.showMessage("It was not possible to create tool.")
      });
    });
  }
  modifyTool(tool: Tool): void{
    const dialogRef = this.dialog.open(DialogmodifyComponent, {
      width: '400px',
      data: tool,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.service.update(result).subscribe(() =>{
        this.service.showMessage("Tool modified with Success!");
        this.atualizarDados();
      },
      err => {
        this.service.showMessage("It was not possible to modify tool.")
      });
    });
  }
  deleteTool(tool: Tool): void{
    
    const dialogRef = this.dialog.open(DialogdeleteComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(response => {
      if(response == true){
        this.service.delete(tool).subscribe(() =>  {
          this.service.showMessage("Tool Deleted with success");
          this.atualizarDados();
        });
      };
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

