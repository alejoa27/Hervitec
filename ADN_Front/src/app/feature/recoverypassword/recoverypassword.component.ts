import { Component, OnInit } from '@angular/core';
import { NewPasswordService } from './shared/service/recoverypassword.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recoverypassword',
  templateUrl: './recoverypassword.component.html',
  styleUrls: ['./recoverypassword.component.scss']
})
export class RecoverypasswordComponent implements OnInit {

  passwordForm: FormGroup;
  Authorization: any;
  value: any;
  error: any;
  constructor(protected newPasswordService: NewPasswordService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.constructForm();
    this.route.queryParams
      .subscribe(params => {
        this.Authorization = params.Authorization;
      });
  }
  runNewPassword() {
    if (this.passwordForm.valid && (this.passwordForm.get('password').value ==  this.passwordForm.get('rpassword').value)) {
      console.log(this.passwordForm.value);
      const formData = new FormData();
      formData.append('password', this.passwordForm.get('password').value);
      formData.append('rpassword', this.passwordForm.get('rpassword').value);
      let headers = new HttpHeaders({
        'Authorization': this.Authorization
      });
      let options = { headers: headers };
      this.newPasswordService.newPassword(formData, options).subscribe(
        value => {
          this.alertSuccessful();
          this.value = value;
        }, error => {
          this.alertInvalid();
          this.error = error;
        }
      )
    }
    else
    {
      this.alertPasswordInvalid();
    }

  }
  private constructForm() {
    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      rpassword: new FormControl('', [Validators.required])
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
  alertPasswordInvalid() {
    Swal.fire({
      title: 'Error!',
      text: 'Las contraseñas no coinciden',
      icon: 'error',
      confirmButtonText: 'Continue'
    })

  }
  alertSuccessful() {
    Swal.fire({
      title: 'Hecho!',
      text: 'La contraseña se cambio correctamente',
      icon: 'success',
      confirmButtonText: 'Continue'
    })

  }
}
