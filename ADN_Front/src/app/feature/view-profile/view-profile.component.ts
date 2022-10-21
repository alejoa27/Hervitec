import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { UpdateTypeUserService } from './shared/service/update-type-user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  closeResult = '';
  actualizarPerfilForm: FormGroup;
  value: any;
  error: any;
  fechaObject: any;
  tipoUsuario: any;
  datosUsuario: any;

  username: any;
  constructor(@Inject(DOCUMENT) private _document, private modalService: NgbModal, protected updateTypeUserService: UpdateTypeUserService) { }



  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result == 'save') {
        this.updateTypeUser();
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onSelect(evt:any){
    this.fechaObject = evt;
    console.log(this.fechaObject);
    
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`; 
    }
  }

  ngOnInit(): void {
    this.constructForm();
    this.getUserInfo();
    this.username = localStorage.getItem('Username');
    this.tipoUsuario = localStorage.getItem('tipo_usuario');
    this._document.body.style.background = 'rgb(179 179 179 / 30%)';
  }

  updateTypeUser() {
    if (this.actualizarPerfilForm.valid) {
      
      const formData = new FormData();

      formData.append('cc', this.actualizarPerfilForm.get('cc').value);
      formData.append('cel', this.actualizarPerfilForm.get('cel').value);
      formData.append('fechaN', this.fechaObject.year+"-"+this.fechaObject.month+"-"+this.fechaObject.day);
      
      var token = localStorage.getItem('token');
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
      let options = { headers: headers };

      this.updateTypeUserService.updateTypeUser(formData, options).subscribe(
        value => {
          this.alertSuccessful();
          this.value = value;

          localStorage.setItem('tipo_usuario', '2');
        }, error => {
          this.alertInvalid();
          this.error = error;
        }
      )
    }


  }

  getUserInfo(){

    var token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    let options = { headers: headers };

    this.updateTypeUserService.getUserInfo(options).subscribe(
      value => {
        this.datosUsuario = value["data"];
      },
      error => {
        this.error = error;
      }
    );
  }

  private constructForm() {
    this.actualizarPerfilForm = new FormGroup({
      cc: new FormControl('', [Validators.required]),
      cel: new FormControl('', [Validators.required]),
      fechaN: new FormControl('', [Validators.required])
    })
  }
  alertInvalid() {
    Swal.fire({
      title: 'Error!',
      text: 'Fallo interno del servidor',
      icon: 'error',
      confirmButtonText: 'Continue'
    })

  }

  alertSuccessful() {
    Swal.fire({
      title: 'Hecho!',
      text: 'Has actualizado tu perfil con éxito',
      icon: 'success',
      confirmButtonText: 'Continue'
    })

  }

}
