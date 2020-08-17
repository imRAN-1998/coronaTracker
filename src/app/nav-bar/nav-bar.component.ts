import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private dataService1 : DataServiceService) { }
  isloading;
  ngOnInit(): void {
    this.dataService1.loading.subscribe(data=>{
      this.isloading=data;
    })
  }
  openSidebar(sidebar : HTMLElement){
    // console.log(sidebar);
    sidebar.classList.add('open');
  }
  closeSidebar(sidebar : HTMLElement){
    sidebar.classList.remove('open');
  }

}
