import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsrcnaddComponent } from './component/template/cardsrcnadd/cardsrcnadd.component';
import { DialogremoveComponent } from './component/template/dialogremove/dialogremove.component';
import { DialogeditComponent } from './component/template/dialogedit/dialogedit.component';
import { DialognewComponent } from './component/template/dialognew/dialognew.component';

//Principais rotas e seu componente
const routes: Routes = [
  { path: '', component: CardsrcnaddComponent },
  { path: 'newTool', component : DialognewComponent},
  { path: 'removeTool', component : DialogremoveComponent},
  { path: 'editTool', component : DialogeditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
