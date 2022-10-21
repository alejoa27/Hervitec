import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaServiceService {

  constructor(protected http: HttpClient) { }

  public getServiciosCategoria(idcategoria){
    return this.http.get(environment.endpoint + '/getcategoria?id='+idcategoria);
  }
}
