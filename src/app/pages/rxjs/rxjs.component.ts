import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subs: Subscription;

  constructor() {

      this.subs = this.regresaObservable().subscribe(
        numero => console.log( 'Subs', numero),
        error => console.error('Error', error),
        () => console.log('El obs termino!')
      );
    }


  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  regresaObservable(): Observable<any> {
      return new Observable( observer => {

        let contador = 0;
        const intervalo = setInterval( () => {
          contador += 1;

          const salida = {
            valor: contador
          };

          observer.next( salida );

          /*if ( contador === 3) {
            clearInterval(intervalo);
            observer.complete();
          }*/
          // if (contador === 2) {
          //  clearInterval(intervalo);
          //  observer.error('Auxilio');
          // }
        }, 500);
      }).retry(2)
      .map( resp => {
        return resp;
      });
  }

}
