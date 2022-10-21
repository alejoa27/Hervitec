import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  constructor(protected http: HttpClient) { }

  public sendOp(data){
    return this.http.post(environment.endpoint+"/sendop", data);
  }
}
