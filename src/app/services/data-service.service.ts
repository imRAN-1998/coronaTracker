import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators'
import { GlobalDataModel } from '../global-data.model';
import { DateWiseData } from '../datewisedata.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  loading =  new Subject<boolean>();
  private globalData;
  data=[];
  private dateWiseData='https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
  constructor(private http1 : HttpClient) { }
  getDateWiseData(){
    this.loading.next(true);
    return this.http1.get(this.dateWiseData,{responseType:'text'}).pipe(map(data=>{
      let rows= data.split('\n');
      let mainData={};
      let header=rows[0];
      let dates=header.split(/,(?=\S)/);
      dates.splice(0,4);
      rows.splice(0,1);
      // console.log(header);
      rows.forEach(row=>{
        let cols=row.split(/,(?=\S)/);
        let con=cols[1];
        cols.splice(0,4);
        let temp=mainData[con];
        // console.log(temp,con);
        mainData[con]=[];
        cols.forEach((value,index)=>{
          let dw: DateWiseData ={
            cases : +value,
            country : con,
            date : new Date(Date.parse(dates[index]))
          }
          mainData[con].push(dw);
        })
        if(temp){
          mainData[con].forEach((value,index)=>{
          //  console.log(mainData[con][index].cases,mainData[con][index].country);
          mainData[con][index].cases = mainData[con][index].cases + temp[index].cases;
           
          })
        }
      })
      // console.log(mainData);
      this.loading.next(false);
      return mainData;
    }));
  }
  getGlobalData(){
    this.loading.next(true);

    let d= new Date();
    let previous= d.setUTCDate(d.getUTCDate() - 2);
    let new1 = new Date(previous);
    let year1=new1.getUTCFullYear().toString();
    let p;
    if(new1.getDate() > 9){
      p=new1.getDate().toString();
    }else{
      p='0'+ new1.getDate().toString();
    }
    let q;
    if(new1.getMonth()+1 > 9){
      q=(new1.getMonth()+1).toString();
    }else{
      q='0' + (new1.getMonth()+1).toString();
    }
    // console.log(p);
    // console.log(q);
    this.globalData='https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/'+q+'-'+p+'-'+year1+'.csv';

    return this.http1.get(this.globalData,{responseType : 'text'}).pipe(
      map((data)=>{
        const gD: GlobalDataModel[]=[];
        const raw: GlobalDataModel[]=[];
        const rows=data.split('\n');
        rows.splice(0,1);
        rows.forEach(row=>{
          const col=row.split(/,(?=\S)/);
          const data: GlobalDataModel={
            country :col[3],
            confirmed : +col[7],
            deaths : +col[8],
            recovered: +col[9],
            active : +col[10]
          }
          const temp: GlobalDataModel=raw[data.country];
          if(temp){
            temp.confirmed += data.confirmed;
            temp.active += data.active;
            temp.deaths += data.deaths;
            temp.recovered += data.recovered;
            raw[data.country]=temp;
          }else{
            raw[data.country]=data;
          }
        })
        const final : GlobalDataModel[] = Object.values(raw);
        this.data=final;
        this.loading.next(false);
        
        // console.log(this.data);
        return final;
      })
    )
  }
}
