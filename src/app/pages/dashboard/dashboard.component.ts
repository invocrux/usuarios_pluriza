import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ApiService } from '../../service/api.service';
import { IResponse } from '../../models/response.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [HeaderComponent, FooterComponent, CommonModule]
})
export class DashboardComponent implements OnInit {

  listaUsers: IResponse[] = [];
  listaUsersOrigin: IResponse[] = [];
  i: number = 0;
  headeTb: string[] = ['ID', 'NOMBRE', 'EMAIL', 'DIRECCION', 'TELEFONO', 'NICK', 'WEBSITE'];
  ocultarTabla: boolean = false;
  constructor(private readonly api: ApiService) { }


  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.listaUsers = [];
    this.listaUsers = this.listaUsersOrigin
    this.api.login().subscribe({
      next: (value) => {
        this.listaUsers.push(...value.sort());
        this.listaUsersOrigin = [...this.listaUsers]
      },
      error: (err) => {
        console.log(err);
      },
    }
    )
  }

  sinResultados(event: boolean) {
    this.ocultarTabla = event;
  }

  usuarioFiltrado(usuario: IResponse[]) {
    this.ocultarTabla = false;
    if (usuario.length > 0) {
      this.listaUsers = usuario
    } else {
      this.listaUsers = this.listaUsersOrigin
    }
  }
}
