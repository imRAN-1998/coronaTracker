
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { DataServiceService } from './services/data-service.service';
import { GlobalDataModel } from './global-data.model';
@Injectable({
    providedIn:'root'
})
export class LoadingResolverService implements Resolve<GlobalDataModel[]>{
    constructor(private dataService1 : DataServiceService ){}
    resolve(route1: ActivatedRouteSnapshot,
        state1 :  RouterStateSnapshot){
            const new1 =this.dataService1.data;
            // console.log(new1);
            if(new1.length==0){
                return this.dataService1.getGlobalData();
            }
    }
}