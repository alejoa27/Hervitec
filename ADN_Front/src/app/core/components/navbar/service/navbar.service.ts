import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(protected http: HttpClient) { }

  public getCategories(){
    return this.http.get(environment.endpoint + '/getcategorias/');
  }
}
