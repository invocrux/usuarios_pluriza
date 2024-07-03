import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '../models/login.interface';
import { Observable } from 'rxjs';
import { IResponse } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  URL: string = 'http://solodata.es/';
  constructor(private readonly http: HttpClient) { }

  login(form: ILogin | Partial<{ usuario: string; password: string; }>): Observable<IResponse> {
    let url = this.URL + 'auth';
    return this.http.post<IResponse>(url, form)
  }
}
