import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactServiceService } from './shared/contact-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  value: any;
  error: any;
  sendOpForm: FormGroup;


  constructor(protected contactService: ContactServiceService) { }

  ngOnInit(): void {
    this.constructForm();
  }

  sendOp() {

    let data = new FormData();

    data.append('nombre', this.sendOpForm.get('nombre').value);
    data.append('email', this.sendOpForm.get('email').value);
    data.append('celular', this.sendOpForm.get('celular').value);
    data.append('opinion', this.sendOpForm.get('opinion').value);


    this.contactService.sendOp(data).subscribe(
      value => {
        this.alertSuccess();
        this.value = value;
      },
      error => {
        this.alertInvalid();
        this.error = error;
      }
    );
  }

  private constructForm() {

    this.sendOpForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      celular: new FormControl('', [Validators.required]),
      opinion: new FormControl('', Validators.required)
    })


  }

  alertInvalid() {
    Swal.fire({
      title: 'Error!',
      text: 'Error al mandar el correo',
      icon: 'error',
      confirmButtonText: 'Continue'
    })

  }

  alertSuccess() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se ha enviado el correo',
      showConfirmButton: false,
      timer: 1500
    })
  }


}
