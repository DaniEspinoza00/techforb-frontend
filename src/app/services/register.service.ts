import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterRequest } from '../models/registerRequest';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private http=inject(HttpClient);
  
  register(request:RegisterRequest):Observable<RegisterRequest>{
    return this.http.post<RegisterRequest>(environment.urlHost+"auth/register", request)
  }
}
