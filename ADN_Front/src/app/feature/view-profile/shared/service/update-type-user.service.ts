import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateTypeUserService {

  constructor(protected http: HttpClient) { }

  public updateTypeUser(user, header){
    return this.http.patch(environment.endpoint + '/changetpuser', user, header)
  }

  public getUserInfo(header){
    return this.http.get(environment.endpoint + '/user/', header);
  }
}
