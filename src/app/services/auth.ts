import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = 'http://localhost:4000/api';

  private apiUrl=(`${environment.apiUrl}/api`);


  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
  return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
    tap((res) => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('rol', res.rol);
      localStorage.setItem('nombre', res.nombre);
      console.log('✅ Token guardado:', res.token);
    })
  );
}


  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
