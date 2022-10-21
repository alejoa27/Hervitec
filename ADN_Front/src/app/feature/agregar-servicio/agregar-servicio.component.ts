import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { AddServiceService } from './shared/service/add-service.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-agregar-servicio',
  templateUrl: './agregar-servicio.component.html',
  styleUrls: ['./agregar-servicio.component.scss']
})
export class AgregarServicioComponent implements OnInit {


  tittle: any;
  addServiceForm: FormGroup;
  error: any;
  value: any;
  action: any;
  data: any;
  idservice: any;
  categorias: any;
  ciudades: any;
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();

  imagen: any;


  constructor(protected addServiceService: AddServiceService, private router: Router, private route: ActivatedRoute) { }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.ciudades.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onChangeImage(event) {
    var img  = event.target.files[0];

    let fileReader = new FileReader();

    fileReader.readAsDataURL(img);

    fileReader.onload = () => {
      this.imagen = btoa(fileReader.result.toString());
    }
  }

  ngOnInit(): void {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

    this.getCategorias();
    this.getCiudades();

    this.route.queryParams
      .subscribe(params => {
        this.action = params.action;
        this.idservice = params.service;
      });

    this.constructForm();

  }
  async sendAddService() {

    let formData = new FormData();

    formData.append('nombre', this.addServiceForm.get('nombre').value);
    formData.append('descripcion', this.addServiceForm.get('descripcion').value);
    formData.append('categoria', this.addServiceForm.get('categoria').value);
    formData.append('idciudad', this.addServiceForm.get('idciudad').value);
    formData.append('imagen', this.imagen);
    formData.append('remoto', '1');

    var token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    let options = { headers: headers };
    


    this.addServiceService.addService(formData, options).subscribe(
      value => {
        this.value = value;
        this.router.navigate(['/gestorservicios'])
      }, error => {
        this.alertInvalid();
        this.error = error;
      }
    )
  }
  getCategorias(){
    this.addServiceService.getCategories().subscribe(
      value => {
        this.categorias = value["categorias"];
      },
      error => {
        this.error = error;
      }
    );
  }

  getCiudades(){
    this.addServiceService.getCiudades().subscribe(
      value => {
        this.ciudades = value["ciudades"];
      },
      error => {
        this.error = error;
      }
    );
  }

  updateService() {
    let formData = new FormData();

    var token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });

    formData.append('nombre', this.addServiceForm.get('nombre').value);
    formData.append('descripcion', this.addServiceForm.get('descripcion').value);
    formData.append('categoria', this.addServiceForm.get('categoria').value);
    formData.append('id', this.idservice);
    formData.append('idciudad', this.addServiceForm.get('idciudad').value);
    formData.append('imagen', '');
    formData.append('remoto', '1');

    
    let options = { headers: headers };

    this.addServiceService.updateService(formData, options).subscribe(
      value => {
        this.value = value;
        this.router.navigate(['/gestorservicios'])
      }, error => {
        this.alertInvalid();
        this.error = error;
      }
    )
  }



   private  constructForm() {

    this.addServiceForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      idciudad: new FormControl('', [Validators.required])
    })

    if (this.action == 'update') {

      this.tittle = "Actualizar";
      
      var token = localStorage.getItem('token');
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
      let options = { headers: headers };
      this.addServiceService.getService(this.idservice, options).subscribe(
        value => {
          this.data = value["servicio"];

          this.addServiceForm = new FormGroup({
            nombre: new FormControl(this.data[0]["nombre"], [Validators.required]),
            descripcion: new FormControl(this.data[0]["descripcion"], [Validators.required]),
            categoria: new FormControl(this.data[0]["categoria_id"], [Validators.required]),
            idciudad: new FormControl(this.data[0]["idciudad_id"], [Validators.required]),
          })
        },
        error =>{
          this.alertInvalid();
          this.error = error;
        }
      );      
      
    }
    else{
      this.tittle = 'Crear';
    }

    
  }
  alertInvalid() {
    Swal.fire({
      title: 'Error!',
      text: 'Hubo un error',
      icon: 'error',
      confirmButtonText: 'Continue'
    })

  }

}
