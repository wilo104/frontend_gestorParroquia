import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportesService } from '../../services/reportes.service'
@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf],
  templateUrl: './reportes.html'
})
export class ReportesComponent {
  from = '';
  to = '';
  resumen: any = null;
  ingCat: any[] = [];
  egreCat: any[] = [];
  errorMsg = '';

  constructor(private rep: ReportesService) {}

  cargar() {
    this.errorMsg = '';

    this.rep.resumen(this.from, this.to).subscribe({
      next: (r: any) => (this.resumen = r),
      error: () => (this.errorMsg = 'Error cargando resumen')
    });

    this.rep.ingresosPorCategoria(this.from, this.to).subscribe({
      next: (d: any[]) => (this.ingCat = d),
      error: () => (this.errorMsg = 'Error cargando ingresos')
    });

    this.rep.egresosPorCategoria(this.from, this.to).subscribe({
      next: (d: any[]) => (this.egreCat = d),
      error: () => (this.errorMsg = 'Error cargando egresos')
    });
  }
}
