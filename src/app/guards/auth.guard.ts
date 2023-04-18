import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private usuarioSvc: UsuarioService,
               private router: Router ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.usuarioSvc.validarToken()
      .pipe(
        tap( isAuth => {
          if ( !isAuth ) this.router.navigateByUrl('/login')
        })
      );

  }
  
}
