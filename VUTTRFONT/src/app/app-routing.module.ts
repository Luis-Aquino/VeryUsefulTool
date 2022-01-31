import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsrcnaddComponent } from './component/template/cardsrcnadd/cardsrcnadd.component';
import { DialognewComponent } from './component/template/dialognew/dialognew.component';

const routes: Routes = [
  { path: '', component: CardsrcnaddComponent },
  { path: 'newTool', component : DialognewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
