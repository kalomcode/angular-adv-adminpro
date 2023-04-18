import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['Kalom', [ Validators.required ] ],
    email: ['kalom@gmail.com', [ Validators.required, Validators.email] ],
    password: ['123456', [ Validators.required ] ],
    password2: ['123456', [ Validators.required ] ],
    terminos: [false, [ Validators.required ] ],
  },{
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor( private fb: FormBuilder,
               private usuarioSvc: UsuarioService,
               private router: Router) { }

  crearUsuario() {
    this.formSubmitted = true;
    console.log( this.registerForm.value );
    console.log( this.registerForm );

    if ( this.registerForm.invalid ) return;

    this.usuarioSvc.crearUsuario( this.registerForm.value )
      .subscribe( {
        next: resp => {
          // Navegar al Dashboard
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          // Si sucede un error
          Swal.fire('Error', err.error.msg, 'error')
        }
      });
  }

  campoNoValido( campo: string ) {
    return this.registerForm.get(campo)?.invalid && this.formSubmitted;
  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    return pass1 !== pass2 && this.formSubmitted;
  }
  
  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  passwordsIguales( pass1Name: string, pass2Name: string ) {

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      pass1Control?.value === pass2Control?.value 
        ? pass2Control?.setErrors(null)
        : pass2Control?.setErrors({ noEsIgual: true })
    }

  }

}
