import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario: Usuario;

  constructor( private usuarioSvc: UsuarioService,
               private sanitizer: DomSanitizer ) {
    this.usuario = this.usuarioSvc.usuario;
  }
   
  logout() {
    this.usuarioSvc.logout()
  }

  getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
