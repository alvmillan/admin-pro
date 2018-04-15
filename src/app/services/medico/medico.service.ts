import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';

@Injectable()
export class MedicoService {

  totalMedicos = 0;

  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarMedicos() {
    const url = URL_SERVICIOS + '/medico';

    return this.http.get(url).map( (res: any) => {
      this.totalMedicos = res.total;
      return res.medicos;
    });
  }

  buscarMedicos( termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url)
      .map( (resp: any) => resp.medicos);
  }

  borrarMedico(id: string) {
      let url = URL_SERVICIOS + '/medico/' + id;
      url += this._usuarioService.token;
      return this.http.delete(url)
        .map( resp => {
          swal( 'Medico borrado', 'Medico borrado correctamente', 'success');
          return resp;
        });
  }

  guardarMedico(medico: Medico) {

    let url = URL_SERVICIOS + '/medico';

    if ( medico._id ) {
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, medico)
        .map( (resp: any) => {
          swal('Medico Actualizado', medico.nombre, 'success');
          return resp.medico;
        });
    } else {
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, medico).map( (resp: any) => {
        swal('Medico creado', medico.nombre, 'success');
        return resp.medico;
      });
    }
  }

  cargarMedico( id: string ) {
    const url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url)
      .map( (resp: any) => resp.medico);
  }

}
