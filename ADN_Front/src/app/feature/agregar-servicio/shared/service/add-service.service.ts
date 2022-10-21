import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddServiceService {

  constructor(protected http: HttpClient) { }
  public addService(service, headers){
    return this.http.post(environment.endpoint + '/createservice/', service, headers);
  }

  public getService(idservice, headers){
    return this.http.get(environment.endpoint + '/getservice?idservice='+idservice, headers);
  }

  public updateService(service, headers){
    return this.http.patch(environment.endpoint + '/modificateservice/', service, headers);
  }


  public getCategories(){
    return this.http.get(environment.endpoint + '/getcategorias/');
  }

  public getCiudades(){
    return this.http.get(environment.endpoint + '/getciudades/');
  }
}
