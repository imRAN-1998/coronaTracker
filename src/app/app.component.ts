import { Component, OnInit } from '@angular/core';
import { DataServiceService } from './services/data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'own-project-five-corona';
  constructor(private dataService1 : DataServiceService) {}
  ngOnInit(){
    // let d= new Date();
    // let previous= d.setUTCDate(d.getUTCDate() - 1);
    // let new1 = new Date(previous);
    // console.log(new1);
    // console.log(new1.getUTCDate());
    // console.log((new1.getUTCMonth()+1));
    // console.log(new1.getUTCFullYear().toString())
    
  }
}
