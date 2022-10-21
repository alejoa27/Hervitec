import { Component, OnInit } from '@angular/core';
import { SendRecoveryService } from './shared/service/sendrecovery.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sendrecovery',
  templateUrl: './sendrecovery.component.html',
  styleUrls: ['./sendrecovery.component.scss']
})
export class SendrecoveryComponent implements OnInit {

  emailForm: FormGroup;
  token: any;
  value: any;
  error: any;
  constructor(protected sendRecoveryService: SendRecoveryService) { }

  ngOnInit(): void {
    this.constructForm();
  }
  runSendEmail() {
    if (this.emailForm.valid) {
      let headers = new HttpHeaders({
        'crossDomain': 'true' });
      let options = { headers: headers };
      console.log(this.emailForm.value);
      this.sendRecoveryService.sendEmail(this.emailForm.value, options).subscribe(
        value => {
          console.log('Successful');
          this.token = value;
          this.alertAviso();
          this.value = value;
        }, error => {
          this.alertInvalid();
          this.error = error;
        }
      )
    }

  }
  private constructForm() {
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }
  alertAviso() {
    Swal.fire({
      title: 'Hecho!',
      text: 'Revise su correo para el cambio de contraseña',
      icon: 'success',
      confirmButtonText: 'Continue'
    })

  }
  alertInvalid() {
    Swal.fire({
      title: 'Error!',
      text: 'El correo no existe',
      icon: 'error',
      confirmButtonText: 'Continue'
    })

  }
}
