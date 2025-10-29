import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { IngresosComponent } from './pages/ingresos/ingresos';
import { EgresosComponent } from './pages/egresos/egresos';
import { ReportesComponent } from './pages/reportes/reportes';
import { LoginComponent } from './pages/login/login';
import { authGuard } from './guards/auth-guard'; // ✅ import guard

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard], // ✅ protege todo el menú
    children: [
      { path: 'ingresos', component: IngresosComponent },
      { path: 'egresos', component: EgresosComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: '', redirectTo: 'ingresos', pathMatch: 'full' }
    ]
  },
  { path: 'login', component: LoginComponent }, // login sin guard
  { path: '**', redirectTo: 'login' }
];
