import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IResponse } from '../../models/response.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Output() listaFiltrada: EventEmitter<IResponse[]> = new EventEmitter<IResponse[]>()
  @Input() listaUsuario: IResponse[] = [];
  listaUsersOrigin: IResponse[] = [];

  ngOnInit(): void {
    this.listaUsersOrigin = [...this.listaUsuario]
  }

  filtrarUsuarios(usuario: string) {
    if (usuario.length > 0) {
      let usuarioEncontrados: IResponse[] = []
      usuarioEncontrados = this.listaUsuario.filter((user) => user.name.toLowerCase().includes(usuario.toLowerCase()))
      this.listaFiltrada.emit(usuarioEncontrados)
    } else {
      this.listaFiltrada.emit(this.listaUsersOrigin)
    }
  }
}
