import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceFilterServiceService } from './shared/service/service-filter-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-filter',
  templateUrl: './service-filter.component.html',
  styleUrls: ['./service-filter.component.scss']
})
export class ServiceFilterComponent implements OnInit {

  //1 es remoto y 2 remoton't
  constructor(protected serviceFilterService: ServiceFilterServiceService, private route: ActivatedRoute, protected router: Router) { }

  error: any;
  servicios: any;
  categorias: any;
  ciudades: any;
  direccion: string;

  ngOnInit(): void {
    this.direccion = '';
    this.getCategorias();
    this.getCiudades()
    this.route.queryParams
      .subscribe(params => {
        if (params.categoria != undefined){
          this.direccion = 'nombre=' + params.nombre + '&';
          this.direction(params.categoria, 'categoria')
        }
        else
          this.direction(params.nombre, 'nombre')
      });
  }
  async direction(value, opcionParam) {
    var reglarExp = opcionParam == 'nombre'?/nombre=[a-zA-Z ]{2,254}&/:'categoria'?/categoria=[\d.]+&/: opcionParam == 'ciudad'?/ciudad=[\d.]+&/: opcionParam == 'remoto'? /remoto=[\d.]+&/:'';
    this.direccion = this.direccion.replace(reglarExp, '')
    this.direccion = this.direccion + (value != '0' ? opcionParam + "=" + value  + '&':''); 
    this.serviceFilterService.serviceFilter(this.direccion).subscribe(
      value => {
        this.servicios = value['servicios'];
      },
      error => {
        this.error = error;
      }
    );
  }

  getIcono(servicio) {
    if(servicio.imagen != '' && servicio.imagen != null){
      return atob(servicio.imagen);
    }
    else{
      return ("https://ui-avatars.com/api/" + "?name=" + servicio.nombre + "&background=random");

    }
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
  getCategorias() {
    this.serviceFilterService.getCategories().subscribe(
      value => {
        this.categorias = value["categorias"];
      },
      error => {
        this.error = error;
      }
    );
  }

  getCiudades() {
    this.serviceFilterService.getCiudades().subscribe(
      value => {
        this.ciudades = value["ciudades"];
      },
      error => {
        this.error = error;
      }
    );
  }

}
