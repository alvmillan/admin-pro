import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class HospitalService {

  constructor(public http: HttpClient, public _usuarioService: UsuarioService) {
  }

  cargarHospitales(desde: number = 0)  {
    const url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get(url);
  }

  buscarHospitales( termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url)
      .map( (resp: any) => resp.hospitales);
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put(url, hospital).map(
      (resp: any) => {
        swal('Hospital actualizado', hospital.nombre, 'sucess');
        return true;
      }
    );
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
      .map( resp => {
        swal('Hospital borrado', 'El hospital ha sido eliminado correctamente', 'success');
        return true;
      });
  }

  obtenerHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital' + id;
    return this.http.get(url);
  }

  crearHospital(nombre: string) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;
    return this.http.post(url, nombre)
      .map( resp => {
        swal('Hospital creado', 'Hospital creado correctamente', 'success');
      });
  }

}
