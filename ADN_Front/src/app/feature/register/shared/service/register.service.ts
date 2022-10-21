import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Register } from '../model/register';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(protected http: HttpService) { }
  public register(register: Register): Observable<Register>{
    return this.http.doPost<Register,any>(environment.endpoint + '/user', register, this.http.optsName('register'))
  }
}
