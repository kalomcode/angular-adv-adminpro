import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit, AfterViewInit {
  
  @ViewChild('googleBtn') googleBtn: ElementRef;

  public formSubmitted = false;

  public loginForm: FormGroup<any> = this.fb.group({
    email: [ localStorage.getItem('email') || '' , [ Validators.required, Validators.email] ],
    password: ['', [ Validators.required ] ],
    remember: [localStorage.getItem('remember') || false]
  });
  
  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioSvc: UsuarioService,
               private ngZone: NgZone ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      this.googleInit()
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "748951832730-irgpj13cb60di8k2qbg7d0eagiggp694.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response: any ) {
    // console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioSvc.loginGoogle( response.credential )
      .subscribe({
        next: resp => {
          console.log({ login: resp})
          // Navegar al Dashboard
          this.ngZone.run(() => {
            this.router.navigateByUrl('/');
          })
        },
        error: err => {
          Swal.fire('Error', err.error.msg, 'error')
        }
      })
  }

  login() {
    
    this.usuarioSvc.login( this.loginForm.value )
      .subscribe({
        next: resp => {

          if ( this.loginForm.get('remember')?.value ) {
            localStorage.setItem('email', this.loginForm.get('email')?.value)
            localStorage.setItem('remember', this.loginForm.get('remember')?.value)
          } else {
            localStorage.removeItem('email')
            localStorage.removeItem('remember')
          } 

          // Navegar al Dashboard
          this.router.navigateByUrl('/');
            
        },
        error: (err) => {
          // Si sucede un error
          Swal.fire('Error', err.error.msg, 'error')
        }
      })

    // console.log( this.loginForm.value )

    // this.router.navigateByUrl('/');
  }

}