import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([]), LoginComponent],
      providers: [ApiService]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con controles vacíos', () => {
    const fbLogin = component.fbLogin;
    expect(fbLogin.controls['usuario'].value).toEqual('');
    expect(fbLogin.controls['password'].value).toEqual('');
  });

  it('debería marcar el formulario como inválido si los campos están vacíos', () => {
    const fbLogin = component.fbLogin;
    expect(fbLogin.valid).toBeFalsy();
  });

  it('debería marcar el formulario como válido si los campos están llenos', () => {
    const fbLogin = component.fbLogin;
    fbLogin.controls['usuario'].setValue('testUser');
    fbLogin.controls['password'].setValue('testPassword');
    expect(fbLogin.valid).toBeTruthy();
  });

  it('debería navegar a "dashboard" cuando el formulario es válido y se hace login', () => {
    const fbLogin = component.fbLogin;
    const navigateSpy = spyOn(router, 'navigate');

    fbLogin.controls['usuario'].setValue('testUser');
    fbLogin.controls['password'].setValue('testPassword');

    component.onLogin();

    expect(navigateSpy).toHaveBeenCalledWith(['dashboard']);
  });

  it('no debería navegar a "dashboard" cuando el formulario es inválido', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.onLogin();
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
