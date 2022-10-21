import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GetserviceService {

  constructor(protected http: HttpClient) { }
  public getService( header) {
    return this.http.get(environment.endpoint + '/geteservices', header)
  }
  public deleteService( data, header) {
    return this.http.post(environment.endpoint + '/deleteservice/',data , header)
  }
}
