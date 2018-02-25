import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @Input() leyenda = 'Leyenda';
  @Input() progreso = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  onChanges( newValue: number) {

    const elemHTML: any = document.getElementsByName('progreso')[0];

    if (newValue >= 100) {
      this.progreso = 100;
    } else if ( newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    elemHTML.value = this.progreso;
    this.cambioValor.emit( this.progreso );
  }


  cambiarValor(valor) {

    if (this.progreso > 100 && valor > 0) {
      this.progreso = 100;
      return;
    }
    if (this.progreso < 0 && valor < 0) {
      this.progreso = 0;
      return;
    }
    this.progreso += valor;

    this.cambioValor.emit( this.progreso );
  }


}
