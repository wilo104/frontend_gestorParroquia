import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ habilita [(ngModel)]
import { AuthService } from '../../services/auth'; // ✅ ruta correcta

@Component({
  selector: 'app-login',
  standalone: true, // ✅ standalone
  imports: [CommonModule, FormsModule, RouterModule], // ✅ módulos necesarios
  templateUrl: '../login/login.html', // ✅ archivos locales
  styleUrls: ['../login/login.css']
})
export class LoginComponent {
  usuario: string = '';
  contrasena: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log('Intentando iniciar sesión:', this.usuario, this.contrasena);

    this.authService.login(this.usuario, this.contrasena).subscribe({
      next: (res: any) => {
        console.log('✅ Login exitoso', res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/ingresos']);
      },
      error: (err: any) => {
        console.error('❌ Error en login:', err);
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
}
