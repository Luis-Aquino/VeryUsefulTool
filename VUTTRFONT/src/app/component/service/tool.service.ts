import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tool } from '../../tool.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
  })
//Classe de serviço para consultar as Api's do backend
export class ToolService {

    //URL base das api's do servidor de backend
    urlBase: string = "http://localhost:3000/tools" ;
    constructor(
      //Cliente http para consultar as api's, e snackbar para as principais operações do app
      private http: HttpClient,
      private snackBar:MatSnackBar,
      ) { }
    //Configurações da snackbar
    showMessage(msg: string, isError: boolean = false): void{
      let snackBarRef = this.snackBar.open(msg, 'Fechar',
      {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 3000,
        panelClass: ['blue-snackbar'],
      });
      snackBarRef.afterDismissed().subscribe(() => {
      })
    }

    //Consulta api para trazer todas as ferramentas cadastradas
    findAll() : Observable<Tool[]> {
      return this.http.get<Tool[]>(this.urlBase + "/findAll"); 
    }

    //Consulta api para trazer as ferramentas que possuem a tag cadastrada
    findByTag(tag: string) : Observable<Tool[]>{
      let url = `${this.urlBase}?tag=${tag}`;
    
      return this.http.get<Tool[]>(url);
    }

    //Consulta api para trazer as ferramentas que possuem o title cadastrado
    findByTitle(title: string) : Observable<Tool[]>{
      let url = `${this.urlBase}/title/${title}`;
    
      return this.http.get<Tool[]>(url);
    }
    //Consulta api para realizar o cadastro de ferramentas
    create(tool: Tool) : Observable<Tool>{
      return this.http.post<Tool>(this.urlBase, tool);
    }

    //Consulta api para editar ferramentas
    update(tool: Tool) : Observable<Tool>{
      return this.http.put<Tool>(this.urlBase, tool);
    }

    //Consulta api para deletar ferramenta por id
    delete(tool: Tool) : Observable<Tool>{
      let url = `${this.urlBase}/${tool.idTool}`;

      return this.http.delete<Tool>(url);
    }

  }
