import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialognewComponent } from 'src/app/component/template/dialognew/dialognew.component'
import { Tool } from 'src/app/tool.model';
import { ToolService } from '../../service/tool.service';
import { DialogremoveComponent } from '../dialogremove/dialogremove.component';
import { DialogeditComponent } from '../dialogedit/dialogedit.component';

@Component({
  selector: 'app-cardsrcnadd',
  templateUrl: './cardsrcnadd.component.html',
  styleUrls: ['./cardsrcnadd.component.css']
})
//Classe/componente que possui as principais funções do app, 
export class CardsrcnaddComponent implements OnInit {
  //Vetor de ferramentas, tipo de pesquisa, string 
  tools : Tool[] = [];
  searchType: boolean = false;
  stringSearch: string = "";

  //Construtor que tem como parametro um atributo de serviço para consultar as api's e outro para proporcionar 
  //a abertura das caixas de diálogo para adicção deleção e modificação das ferramentas.
  constructor(
    public dialog: MatDialog,
    private service : ToolService,
  ) { }

  //A classe ja inicia atualizando os dados
  ngOnInit(): void {
    this.atualizarDados();
  }    

  //Atualiza informações da tela principal, chamando o método para achar todas as ferramentas na classe de serviço
  atualizarDados(): void {
    this.service.findAll().subscribe(tools => {
      this.tools = tools
    })
  }

  //Função/método para adicionar nova ferramenta, o qual abre o diálogo que possui um form para cadastro de 
  //ferramentas, quando clicado o botão add Tool, fecha o dialog e retorna o objeto criado 
  //tendo como campo title obrigatório
  addTool(): void {
    const dialogRef = this.dialog.open(DialognewComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result != null){
        this.service.create(result).subscribe(() =>{
          this.service.showMessage("Tool created with Success!");
          this.atualizarDados();
        },
        err => {
          this.service.showMessage("It was not possible to create tool.");
        });
     };
    });
  }

  //Função/método para modificar ferramenta, passando o objeto ferramenta para o componente de 
  //diálogo e recebendo de volta do diálogo a ferramenta modificada e chamando o método update da classe
  //de serviço
  modifyTool(tool: Tool): void{

    const dialogRef = this.dialog.open(DialogeditComponent, {
      width: '400px',
      data: tool,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != null){
        this.service.update(result).subscribe(() =>{
          this.service.showMessage("Tool modified with Success!");
          this.atualizarDados();
        },
        err => {
          this.service.showMessage("It was not possible to modify tool.")
        });
     };
    });
  }

  //Função/método para deletar ferramenta, abrindo o diálogo de deleção que retorna true ou false
  //Se o dialgo retorna true ele executa o método de deleção, se false ele nada faz
  deleteTool(tool: Tool): void{
    const dialogRef = this.dialog.open(DialogremoveComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(response => {
      if(response == true){
        this.service.delete(tool).subscribe(() =>  {
          this.service.showMessage("Tool removed with success");
          this.atualizarDados();
        });
      };
    });
  }

  //Função/método para buscar ferramenta de acordo com os parâmetros de seleção
  //Três modos possíveis: busca por tags, por title da ferramenta, e caso esteja vazio o campo de pesquisa retorna todos
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
  
  //Recebe a mudança quando o campo de pesquisa por tags for selecionado ou não atribuindo a uma variável do tipo boolean
  setSearch(): void{
    if (this.searchType == false)
      this.searchType = true;
    else
    this.searchType = false;
  }
  
}

