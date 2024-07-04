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
  i: number;
  headeTb: string[] = ['ID', 'NOMBRE', 'EMAIL', 'DIRECCION', 'TELEFONO', 'NICK', 'WEBSITE'];
  constructor(private readonly api: ApiService) { }


  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.api.login().subscribe({
      next: (value) => {
        console.log(value);
        this.listaUsers.push(...value.sort());
      },
      error: (err) => {
        console.log(err);
      },
    }
    )
  }

}
