import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  // private base = 'http://localhost:4000/api/reportes';
   private base=(`${environment.apiUrl}/api/reportes`);


  constructor(private http: HttpClient) {}

  private headers(): HttpHeaders {
    const t = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: t ? `Bearer ${t}` : ''
    });
  }

  resumen(from?: string, to?: string): Observable<any> {
    let params = new HttpParams();
    if (from) params = params.set('from', from);
    if (to) params = params.set('to', to);
    return this.http.get<any>(`${this.base}/resumen`, { headers: this.headers(), params });
  }

  ingresosPorCategoria(from?: string, to?: string): Observable<any[]> {
    let params = new HttpParams();
    if (from) params = params.set('from', from);
    if (to) params = params.set('to', to);
    return this.http.get<any[]>(`${this.base}/ingresos-por-categoria`, { headers: this.headers(), params });
  }

  egresosPorCategoria(from?: string, to?: string): Observable<any[]> {
    let params = new HttpParams();
    if (from) params = params.set('from', from);
    if (to) params = params.set('to', to);
    return this.http.get<any[]>(`${this.base}/egresos-por-categoria`, { headers: this.headers(), params });
  }
}
