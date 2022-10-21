import { Component, OnInit } from '@angular/core';
import { RegisterService } from './shared/service/register.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  
  registerForm: FormGroup;
  error: any;
  constructor(protected registerService: RegisterService, private router: Router) { }

  ngOnInit(): void {
    this.constructForm();
  }
  runRegister(){
    if(this.registerForm.valid){
      
      this.registerService.register(this.registerForm.value).subscribe(
        value => {
          console.log(value);
          this.router.navigate(['/login'])
        }, error => {
          this.alertInvalid();
          this.error = error;
        }
      )
    }
  }
  private constructForm(){
    this.registerForm = new FormGroup({
      apellido: new FormControl ('', [Validators.required]),
      email: new FormControl ('', [Validators.required, Validators.email]),
      password: new FormControl ('', [Validators.required]),
      ciudad: new FormControl ('', [Validators.required]),
      nombre: new FormControl ('', [Validators.required])
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

}