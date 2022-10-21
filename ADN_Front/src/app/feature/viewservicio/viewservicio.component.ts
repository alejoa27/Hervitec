import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewservicioService } from './shared/service/viewservicio.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ChatService } from '../chat/shared/service/chat.service';
@Component({
  selector: 'app-viewservicio',
  templateUrl: './viewservicio.component.html',
  styleUrls: ['./viewservicio.component.scss']
})
export class ViewservicioComponent implements OnInit {
  commentForm: FormGroup;
  servicio: any;
  comentarios: any;
  data: any;
  stars: number[] = [1, 2, 3, 4, 5];
  starValue: any;
  selectedValue: number;
  id_user_service: any;
  name_user_service: any;

  constructor(
    protected chatService: ChatService,
    protected viewservicioService: ViewservicioService,
    private route: ActivatedRoute,
    protected router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.servicio = params.servicio;
      });
    this.getService()
    this.getComents()
    this.constructForm()

  }
  countStar(star) {
    this.selectedValue = star
    this.commentForm.patchValue({ puntaje: this.selectedValue });
    this.commentForm.get('puntaje').updateValueAndValidity();

  }

  getService() {
    var token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    let options = { headers: headers };
    this.viewservicioService.getService(this.servicio, options).subscribe(
      value => {
        
        this.data = value["servicio"];
        this.id_user_service = this.data['idProveedor_id']
        this.name_user_service = value['Proveedor']['nombre'] + " " + value['Proveedor']['apellido']

        console.log(value);
        localStorage.setItem('Proveedor', this.name_user_service)

      });


  }
  getComents() {
    this.viewservicioService.getComents(this.servicio).subscribe(
      value => {
        this.comentarios = value["puntuaciones"];

      });
  }

  sendComents() {
    let formData = new FormData();
    if (this.commentForm.get('puntaje').value != '' && this.commentForm.get('mensaje').value != '') {
      formData.append('mensaje', this.commentForm.get('mensaje').value);
      formData.append('puntaje', this.commentForm.get('puntaje').value);
      formData.append('idServicio', this.data.id);
      var token = localStorage.getItem('token');
      let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
      let options = { headers: headers };

      this.viewservicioService.sendComents(formData, options).subscribe(
        value => {
          this.comentarios = value["puntuaciones"];
          this.getComents()
          this.alertSuccess();


        });
    }
    else {
      this.alertInvalid();
    }


  }
  contStars() {
    return new Array(Number(this.data.puntajeTotal));
  }
  contNoStars() {
    return new Array(5 - Number(this.data.puntajeTotal));
  }
  contStarsElement(element) {
    return new Array(Number(element.puntaje));
  }
  contNoStarsElement(element) {
    return new Array(5 - Number(element.puntaje));
  }
  getIcono(data) {

    if (data.imagen != '' && data.imagen != null && data.imagen != undefined) {
      return atob(data.imagen);
    }
    else {
      return ("https://ui-avatars.com/api/" + "?name=" + data.nombre + "&background=random");

    }
  }
  private constructForm() {

    this.commentForm = new FormGroup({
      mensaje: new FormControl('', [Validators.required]),
      puntaje: new FormControl('', [Validators.required]),
    })
  }

  alertInvalid() {
    Swal.fire({
      title: 'Error!',
      text: 'Hubo un error',
      icon: 'error',
      confirmButtonText: 'Continue'
    })

  }
  alertSuccess() {
    Swal.fire({
      title: 'Enviado',
      text: 'Comentario enviado',
      icon: 'success',
      confirmButtonText: 'Continue'
    })
  }

  initChat() {

    this.chatService.setChat(
      { "value": "Hola estoy interesado en tu servicio!" },
      this.id_user_service,
      this.name_user_service,
      null
    )

    this.router.navigate(['chat']);

  }
}
