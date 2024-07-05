import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IResponse } from '../../models/response.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Output() listaFiltrada: EventEmitter<IResponse[]> = new EventEmitter<IResponse[]>()
  @Output() sinResultados: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Input() listaUsuario: IResponse[] = [];
  listaUsersOrigin: IResponse[] = [];
  fbBuscar = new FormGroup({
    buscar: new FormControl<string>('', Validators.required),
  });

  ngOnInit(): void {
    this.listaUsersOrigin = [...this.listaUsuario]
    this.fbBuscar.valueChanges.subscribe((resp) => {
      if ( resp.buscar && resp.buscar.length > 0) {
        this.filtrarUsuarios(resp.buscar)
      }else{
        this.listaFiltrada.emit([])
      }
    })
  }

  filtrarUsuarios(usuario: string) {
    let usuarioEncontrados: IResponse[] = []
      usuarioEncontrados = this.listaUsuario.filter((user) => user.name.toLowerCase().includes(usuario.toLowerCase()))
      if(usuarioEncontrados.length > 0){
      this.listaFiltrada.emit(usuarioEncontrados)
    } else {
        this.sinResultados.emit(true)
    }
  }
}
