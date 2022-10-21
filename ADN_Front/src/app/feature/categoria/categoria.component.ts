import { Component, OnInit } from '@angular/core';
import { CategoriaServiceService } from './shared/service/categoria-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  servicios: any;
  idCategoria: any;
  nombreCategoria: any;
  error: any;

  constructor(protected categoriaServiceService: CategoriaServiceService, protected route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.idCategoria = params.id;
        this.nombreCategoria = params.nom;
      });
    this.getServiciosCategoria();

  }

  getServiciosCategoria() {
    this.categoriaServiceService.getServiciosCategoria(this.idCategoria).subscribe(
      value => {
        this.servicios = value["servicios"];
      },
      error => {
        this.error = error;
      }
    );
  }

  getIcono(name) {
    return ("https://ui-avatars.com/api/" + "?name=" + name + "&background=random");
  }

  goToService() {
    this.router.navigate(['/viewservicio']);
  }



}
