import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup; 
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService ) {
    
    this.usuario = usuarioService.usuario;
    console.log(this.usuario)
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required],
      email: [ 
        {
          value:this.usuario.email, 
          disabled: this.usuario.google
        }, 
        [Validators.required, Validators.email]
      ],
    });
    
  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil( this.perfilForm.value )
      .subscribe({
        next: () => {
          const { nombre, email } = this.perfilForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;

          Swal.fire('Guardado', 'Cambios fueron guardados', 'success')
        },
        error: (err) => {
          Swal.fire('Error', err.error.msg, 'error')
          console.log(err.error.msg)
        }
      })
  }

  cambiarImagen( file: File ) {
    this.imagenSubir = file;

    if ( !file ) {
      this.imgTemp = null;
      return;
    };

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result
    }
  }

  subirImagen() {
    this.fileUploadService
      .actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid!)
      .then( img => {
        this.usuario.img = img
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success')
      })
      .catch( err => {
        Swal.fire('Error', 'Fallo en la subida de imagen', 'error')
      })
  }

}
