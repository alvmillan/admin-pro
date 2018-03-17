import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class UsuarioService {

  token: string;
  usuario: Usuario;

  constructor(public http: HttpClient,
              public router: Router,
              public _subirArchivoService: SubirArchivoService) {
    console.log('servicio usuario listo');
   }

   estaLogueado() {
     this.cargarStorage();
    return ( this.token.length > 5) ? true : false;
   }

   logout() {
     this.usuario = null;
     this.token = '';
     localStorage.removeItem('token');
     localStorage.removeItem('usuario');
     this.router.navigate(['/login']);
   }

   cargarStorage() {
     if ( localStorage.getItem('token')) {
       this.token = localStorage.getItem('token');
       this.usuario = JSON.parse(localStorage.getItem('usuario'));
     } else {
       this.token = '';
       this.usuario = null;
     }
   }

   crearUsuario( usuario: Usuario ) {
    const url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario)
      .map( (resp: any) => {
        swal('Usuario creado', usuario.correo, 'success');
        return resp.usuario;
      });
   }

   login( usuario: Usuario, recordar: boolean = false ) {

      if ( recordar ) {
        localStorage.setItem('email', usuario.correo);
      } else {
        localStorage.removeItem('email');
      }
      const url = URL_SERVICIOS + '/login';
      return this.http.post(url, usuario)
        .map( (resp: any) => {
          localStorage.setItem('id', resp.id);
          localStorage.setItem('token', resp.token);
          localStorage.setItem('usuario', JSON.stringify(resp.usuario));
          this.token = resp.token;
          return true;
        });

   }

   actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + this.usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url, usuario).map(
      (resp: any) => {
        this.usuario = resp.usuario;
        const usuarioDB: Usuario = resp.usuario;
        localStorage.setItem('id', usuarioDB._id);
        localStorage.setItem('usuario', JSON.stringify(usuarioDB));
        swal('Usuario actualizado', usuario.nombre, 'success');
      }
    );
   }

   cambiarImagen(file: File, id: string ) {
     this._subirArchivoService.subirArchivo(file, 'usuarios', id)
       .then( (resp: any) => {
         this.usuario.img = resp.usuario.img;
         swal( 'Imagen actualizada', this.usuario.nombre, 'success');
         localStorage.setItem('usuario', JSON.stringify(this.usuario));
       })
       .catch( resp => {
        console.log('no ok');
         console.log(resp);
       });
   }

}
