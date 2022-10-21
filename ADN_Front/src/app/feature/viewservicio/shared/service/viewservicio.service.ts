import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViewservicioService {

  constructor(protected http: HttpClient) { }

  
  public getService(idservice, headers){
    return this.http.get(environment.endpoint + '/getservice?idservice='+idservice, headers);
  }

  public getComents(id){
    return this.http.get(environment.endpoint + '/sendscore?id='+id);
  }

  public sendComents(data, options){
    return this.http.post(environment.endpoint + '/sendscore', data, options);
  }
}
