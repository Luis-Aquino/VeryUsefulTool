import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
//Classe/componente de cabeçalho
export class HeaderComponent implements OnInit {
  title = "VUTTR"
  desc = "Very Useful Tools to Remember";
  constructor() { }

  ngOnInit(): void {
  }
}
