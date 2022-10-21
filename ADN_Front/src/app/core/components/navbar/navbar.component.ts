import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';
import { NavbarService } from './service/navbar.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  @Input()
  items: MenuItem[];
  categorias : any;
  error : any;
  sesionActiva: any;
  nameFilter: any;
  constructor(protected navBarService : NavbarService, protected router: Router) { }


  ngOnInit() {
    this.sesionActiva = this.readLocalStorageValue('token');
    this.getCategorias();
  }

  readLocalStorageValue(key) {
    return localStorage.getItem(key) != null;
  }

  getCategorias(){
    this.navBarService.getCategories().subscribe(
      value => {
        this.categorias = value["categorias"];
      },
      error => {
        this.error = error;
      }
    );
  }
  filterByName(event: any){
    let nombre = event.target.nameFilter.value;
    
    this.router.navigate(['/filter-service'], { queryParams: {nombre: nombre}});
  }

  async logOut(){
    localStorage.clear();
    await this.router.navigate(["/login"]);
    window.location.reload();
  }

}
