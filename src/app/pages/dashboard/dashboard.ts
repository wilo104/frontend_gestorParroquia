import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-blue-900 text-white flex flex-col">
      <div class="p-4 text-center border-b border-blue-800">
        <h2 class="text-lg font-bold">San Juan XXIII</h2>
        <p class="text-sm text-blue-300">Gestor Parroquial</p>
      </div>
      <nav class="flex-1 p-4 space-y-3">
        <a routerLink="/dashboard" class="block px-3 py-2 rounded hover:bg-blue-800">🏠 Inicio</a>
        <a routerLink="/ingresos" class="block px-3 py-2 rounded hover:bg-blue-800">💰 Ingresos</a>
        <a routerLink="/egresos" class="block px-3 py-2 rounded hover:bg-blue-800">💸 Egresos</a>
        <a routerLink="/reportes" class="block px-3 py-2 rounded hover:bg-blue-800">📊 Reportes</a>
      </nav>
      <div class="p-4 border-t border-blue-800">
        <button class="w-full py-2 bg-blue-800 hover:bg-blue-700 rounded">Cerrar sesión</button>
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 p-8">
      <header class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-semibold text-blue-800">Panel Parroquial</h1>
        <div class="flex items-center space-x-4">
          <span class="text-gray-700">👤 Administrador</span>
        </div>
      </header>

      <!-- Aquí se mostrarán los subcomponentes -->
      <router-outlet></router-outlet>
    </main>
  </div>
  `
})
export class DashboardComponent {}
