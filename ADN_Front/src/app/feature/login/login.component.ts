import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/service/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: any;
  constructor(protected loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.constructForm();
  }
  runAuth() {
    if (this.loginForm.valid) {

      this.loginService.auth(this.loginForm.value).subscribe(
        async value => {

          localStorage.setItem('token', value['token']);
          localStorage.setItem('Username', value['user']['nombre']);
          localStorage.setItem('tipo_usuario', value['user']['tipo_usuario']);
          localStorage.setItem('id', value['user']['id']);

          await this.router.navigate(['/home']);
          window.location.reload();
        }, error => {
          this.alertInvalid();
          this.error = error;
        }
      )
    }
  }
  private constructForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }
  alertInvalid() {
    Swal.fire({
      title: 'Error!',
      text: 'contraseña o usuario incorrectos',
      icon: 'error',
      confirmButtonText: 'Continue'
    })

  }

}
