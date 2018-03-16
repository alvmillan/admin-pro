import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo: string;
  recuerdame = false;

  constructor(public router: Router,
              public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    init_plugins();

    this.correo = localStorage.getItem('email') || '';
    if (this.correo.length > 1) {
      this.recuerdame = true;
    }
  }

  ingresar( forma: NgForm) {
    // console.log('ingresando');
    if (forma.invalid ) {
      return;
    }
    const usuario = new Usuario(
      null, forma.value.correo, forma.value.password
    );

    this._usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe( resp => {
        console.log(resp);
        this.router.navigate([ '/dashboard']);
      });

  }

}
