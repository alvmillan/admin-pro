import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  label = '';
  constructor(private router: Router, public _title: Title, public meta: Meta) {
      this.getDataRoute().subscribe( data => {
        this.label = data.titulo;
        this._title.setTitle(this.label);
        const metatag: MetaDefinition = {
          name: 'description',
          content: this.label
        };
        this.meta.updateTag(metatag);
      });
   }

   getDataRoute() {
    return this.router.events
    .filter( evento => evento instanceof ActivationEnd)
    .filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null)
    .map( (evento: ActivationEnd) => evento.snapshot.data);
   }

  ngOnInit() {
  }

}
