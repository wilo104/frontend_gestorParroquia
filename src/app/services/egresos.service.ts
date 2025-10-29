import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EgresosService {
  // private apiUrl = 'http://localhost:4000/api/egresos';
private apiUrl=(`${environment.apiUrl}/egresos`);

  constructor(private http: HttpClient) {}

private getHeaders(): HttpHeaders {
  const token = localStorage.getItem('token');
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
}


  getEgresos(): Observable<any[]> {
    const headers = this.getHeaders();
    console.log('📤 Headers GET:', headers);
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

 addEgreso(data: any): Observable<any> {
  const headers = this.getHeaders();
  console.log('📤 Headers que realmente se envían:', headers.keys().map(k => `${k}: ${headers.get(k)}`));
  return this.http.post<any>(this.apiUrl, data, { headers });
}
 updateEgreso(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() });
  }

  deleteEgreso(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

}
