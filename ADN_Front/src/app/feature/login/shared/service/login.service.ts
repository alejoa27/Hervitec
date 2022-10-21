import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Login } from '../model/login';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(protected http: HttpService) { }
  public auth(login: Login): Observable<Login>{
    return this.http.doPost<Login,any>(environment.endpoint + '/auth', login, this.http.optsName('auth'))
  }
}
