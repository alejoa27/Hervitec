import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceFilterServiceService {

  constructor(protected http: HttpClient) { }

  public serviceFilter(dir){
    return this.http.get(environment.endpoint + "/getservicesfilter?" + dir);
  }
  public getCiudades(){
    return this.http.get(environment.endpoint + '/getciudades/');
  }
  public getCategories(){
    return this.http.get(environment.endpoint + '/getcategorias/');
  }
}
