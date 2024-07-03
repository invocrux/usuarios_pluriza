import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { ILogin } from '../../models/login.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  fbLogin = new FormGroup({
    usuario: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(private readonly api: ApiService) { }


  onLogin(arg: ILogin | Partial<{ usuario: string; password: string; }>) {
    this.api.login(arg).subscribe({
      next(value) {
        console.log(value);
      },
      error(err) {
        console.log(err);
      },
    }
    )
  }
}
