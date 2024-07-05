import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IResponse } from '../../models/response.interface';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    // Verifica que el componente se crea correctamente.
    expect(component).toBeTruthy();
  });

  it('debería inicializar listaUsersOrigin con listaUsuario', () => {
    // Verifica que listaUsersOrigin se inicializa correctamente con listaUsuario en ngOnInit.
    const mockUsers: IResponse[] = [
      {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'john.doe@example.com',
        address: {
          street: 'Street 1',
          suite: 'Suite 1',
          city: 'New York',
          zipcode: '10001',
          geo: {
            lat: '0.0',
            lng: '0.0'
          }
        },
        phone: '123-456-7890',
        website: 'johndoe.com',
        company: {
          name: 'Company 1',
          catchPhrase: 'Catchphrase 1',
          bs: 'BS 1'
        }
      },
      {
        id: 2,
        name: 'Jane Smith',
        username: 'janesmith',
        email: 'jane.smith@example.com',
        address: {
          street: 'Street 2',
          suite: 'Suite 2',
          city: 'Los Angeles',
          zipcode: '90001',
          geo: {
            lat: '0.0',
            lng: '0.0'
          }
        },
        phone: '987-654-3210',
        website: 'janesmith.com',
        company: {
          name: 'Company 2',
          catchPhrase: 'Catchphrase 2',
          bs: 'BS 2'
        }
      }
    ];
    component.listaUsuario = mockUsers;
    component.ngOnInit();
    expect(component.listaUsersOrigin).toEqual(mockUsers);
  });

  it('debería emitir la lista de usuarios filtrados', () => {
    // Verifica que la lista filtrada de usuarios se emite correctamente cuando se realiza una búsqueda válida.
    const mockUsers: IResponse[] = [
      {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'john.doe@example.com',
        address: {
          street: 'Street 1',
          suite: 'Suite 1',
          city: 'New York',
          zipcode: '10001',
          geo: {
            lat: '0.0',
            lng: '0.0'
          }
        },
        phone: '123-456-7890',
        website: 'johndoe.com',
        company: {
          name: 'Company 1',
          catchPhrase: 'Catchphrase 1',
          bs: 'BS 1'
        }
      },
      {
        id: 2,
        name: 'Jane Smith',
        username: 'janesmith',
        email: 'jane.smith@example.com',
        address: {
          street: 'Street 2',
          suite: 'Suite 2',
          city: 'Los Angeles',
          zipcode: '90001',
          geo: {
            lat: '0.0',
            lng: '0.0'
          }
        },
        phone: '987-654-3210',
        website: 'janesmith.com',
        company: {
          name: 'Company 2',
          catchPhrase: 'Catchphrase 2',
          bs: 'BS 2'
        }
      }
    ];
    component.listaUsuario = mockUsers;
    component.ngOnInit();

    spyOn(component.listaFiltrada, 'emit');
    component.fbBuscar.controls['buscar'].setValue('John');

    expect(component.listaFiltrada.emit).toHaveBeenCalledWith([
      {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'john.doe@example.com',
        address: {
          street: 'Street 1',
          suite: 'Suite 1',
          city: 'New York',
          zipcode: '10001',
          geo: {
            lat: '0.0',
            lng: '0.0'
          }
        },
        phone: '123-456-7890',
        website: 'johndoe.com',
        company: {
          name: 'Company 1',
          catchPhrase: 'Catchphrase 1',
          bs: 'BS 1'
        }
      }
    ]);
  });

});
