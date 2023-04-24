import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  usuario: Usuario;

  constructor( private sidebarSvc: SidebarService,
               private usuarioSvc: UsuarioService ) { 
    this.menuItems = sidebarSvc.menu;
    this.usuario = this.usuarioSvc.usuario;
  }

  ngOnInit(): void {
  }

}
