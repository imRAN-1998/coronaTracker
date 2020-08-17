import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  constructor() { }
  @Input('totalconfirmed') totalConfirmed =0;
  @Input('totalactive') totalActive =0;
  @Input('totalrecovered') totalRecovered=0;
  @Input('totaldeaths') totalDeaths=0;
  ngOnInit(): void {
    
  }

}
