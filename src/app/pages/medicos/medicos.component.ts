import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  constructor(public _medicosService: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this._medicosService.buscarMedicos(termino).subscribe( medicos => this.medicos = medicos);
  }

  cargarMedicos() {
    this._medicosService.cargarMedicos()
      .subscribe( medicos => {
        this.medicos = medicos;
      });
  }

  borrarMedico(medico: Medico) {
    this._medicosService.borrarMedico(medico._id).subscribe( () => this.cargarMedicos());
  }

}
