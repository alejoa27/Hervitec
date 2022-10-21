import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  error: any;
  nameFilter: any;

  constructor(protected route: ActivatedRoute, protected router: Router) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.error = params.error;
      });
    
    if (this.error != null) {
      Swal.fire({
        title: this.error,
        text: 'Ingrese a su perfil para validarse como prestador de servicios',
        icon: 'warning',
        confirmButtonText: 'Continue'
      }).then(() => this.clearUrl());
    }
  }

  filterByName(event: any){
    let nombre = event.target.nameFilter.value;
    
    this.router.navigate(['/filter-service'], { queryParams: {nombre: nombre}});
  }

  clearUrl(){
    this.router.navigate([], {
      queryParams: {
        'error': null,
      },
      queryParamsHandling: 'merge'
    })
  }

}
