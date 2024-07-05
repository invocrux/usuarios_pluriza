import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

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
  constructor(private readonly api: ApiService, private router: Router) { }

  onLogin() {
    if (this.fbLogin.valid) {
      this.router.navigate(["dashboard"]);
    }
  }
}
