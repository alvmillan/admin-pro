import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Hospital } from '../../models/hospital.model';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor(public _hospitalService: HospitalService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe( resp => this.cargarHospitales());
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales(this.desde)
      .subscribe( (res: any) => {
        this.totalRegistros = res.total;
        this.hospitales = res.hospitales;
        this.cargando = false;
      });
  }

  cambiarDesde( valor: number) {
    const desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();
  }

  buscarHospital( termino: string) {
    if ( termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this._hospitalService.buscarHospitales(termino).subscribe( (hospitales: Hospital[]) => {
      this.hospitales = hospitales;
    });
  }

  borrarHospital(hospital: Hospital) {
    swal({
      title: '¿Está seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(
      borrar => {
        console.log(borrar);
        if (borrar) {
          this._hospitalService.borrarHospital(hospital._id).subscribe( borrado => {
            console.log( borrado );
            this.cargarHospitales();
          });
        }
      }
    );
  }

  guardarHospital( hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital).subscribe();
  }

  crearHospital() {
    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( valor => {
      if (!valor || valor.length === 0) {
        return;
      }

      this._hospitalService.crearHospital(valor)
        .subscribe( () => this.cargarHospitales());
    });
  }
}
