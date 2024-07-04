import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '../models/login.interface';
import { Observable } from 'rxjs';
import { IResponse } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  URL: string = 'https://jsonplaceholder.typicode.com/users';
  constructor(private readonly http: HttpClient) { }

  login(): Observable<IResponse[]> {
    return this.http.get<IResponse[]>(this.URL)
  }
}
