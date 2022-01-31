import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tool } from '../../tool.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
  })
export class ToolService {
    urlBase: string = "http://localhost:3000/tools" ;
    constructor(
      private http: HttpClient,
      private snackBar:MatSnackBar,
      ) { }

    showMessage(msg: string, isError: boolean = false): void{
      this.snackBar.open(msg, 'Fechar',
      {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 8000,
        panelClass: ['blue-snackbar'],
      });
    }

    findAll() : Observable<Tool[]> {
      return this.http.get<Tool[]>(this.urlBase); 
    }
    findByTag(tag: string) : Observable<Tool[]>{
      let url = `${this.urlBase}/tag/${tag}`;
    
      return this.http.get<Tool[]>(url);
    }
    findByTitle(title: string) : Observable<Tool[]>{
      let url = `${this.urlBase}/title/${title}`;
    
      return this.http.get<Tool[]>(url);
    }
    create(tool: Tool) : Observable<Tool>{
      return this.http.post<Tool>(this.urlBase, tool);
    }
    update(tool: Tool) : Observable<Tool>{
      return this.http.put<Tool>(this.urlBase, tool);
    }
    delete(tool: Tool) : Observable<Tool>{
      let url = `${this.urlBase}/${tool.idTool}`;
      return this.http.delete<Tool>(url);
    }
  }
