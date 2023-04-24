﻿import { environment } from "src/environments/environment"

const base_url = environment.base_url;

export class Usuario {
    
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string,
    ){}

    get imagenUrl () {

        if ( this.img?.includes('http') ) {
            return this.img
        }

        return this.img 
                    ? `${ base_url }/upload/usuarios/${ this.img }`
                    : `${ base_url }/upload/usuarios/no-image`
    }

}