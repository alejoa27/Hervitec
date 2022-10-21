import { Component, OnInit } from '@angular/core';
import { GetserviceService } from './service/getservice.service';
import Swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestorservicios',
  templateUrl: './gestorservicios.component.html',
  styleUrls: ['./gestorservicios.component.scss']
})
export class GestorserviciosComponent implements OnInit {

  servicios: any;
  error: any;

  constructor( protected router: Router,protected getService: GetserviceService) { }

  ngOnInit(): void {
    this.runAuth()
  }
  runAuth() {
    var token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    let options = { headers: headers };
    this.getService.getService(options).subscribe(
      value => {
        this.servicios = value['servicios']
      }, error => {
        this.alertInvalid('Usuario no autenticado');
        this.error = error;
      }
    )
  }
  eliminar(id) {
    var token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    let options = { headers: headers };
    let data = new FormData();
    data.append('id', id);
    
    this.getService.deleteService(data, options).subscribe(
      value => {
        this.servicios = value['servicios'];
      }, error => {
        this.alertInvalid('Error al eliminar');
        this.error = error;
      }
    )
  }
  alertInvalid(texto) {
    Swal.fire({
      title: 'Error!',
      text: texto,
      icon: 'error',
      confirmButtonText: 'Continue'
    })

  }
  goToService(id) {
    this.router.navigate(['/viewservicio'],{ queryParams: {servicio: id}});
  }
  contStars(servicio){
    return new Array(Number(servicio.puntajeTotal));
  }
  contNoStars(servicio){
    return new Array(5 - Number(servicio.puntajeTotal));
  }
  getIcono(servicio) {
    if(servicio.imagen != '' && servicio.imagen != null){
      return atob(servicio.imagen);
    }
    else{
      return ("https://ui-avatars.com/api/" + "?name=" + servicio.nombre + "&background=random");

    }
  }
}
