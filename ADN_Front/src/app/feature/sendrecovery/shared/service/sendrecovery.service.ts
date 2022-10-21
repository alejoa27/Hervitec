import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { SendRecovery } from '../model/sendrecovery';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendRecoveryService {

  constructor(protected http: HttpService, ) { }
  public sendEmail(sendRecovery: SendRecovery, header: any): Observable<SendRecovery>{
    return this.http.doPost<SendRecovery,any>(environment.endpoint + '/user/recovery', sendRecovery, header)
  }
}
