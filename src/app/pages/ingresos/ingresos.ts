import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IngresosService } from '../../services/ingresos.services';

@Component({
  selector: 'app-ingresos',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf],
  templateUrl: './ingresos.html',
  styleUrls: ['./ingresos.css']
})
export class IngresosComponent {
  categorias = [
    'Bautismos',
    'Matrimonios',
    'Constancias',
    'Varios',
    'Limosna',
    'Actividades'
  ];

  categoria = 'Bautismos';
  descripcion = '';
  monto: number | null = null;
  fecha = new Date().toISOString().slice(0, 10);
  ingresos: any[] = [];
  errorMsg = '';

  editando = false;
  ingresoIdEditando: number | null = null;

  constructor(private ingresosService: IngresosService) {
    this.cargar();
  }

  cargar() {
    this.ingresosService.getIngresos().subscribe({
      next: (data: any[]) => (this.ingresos = data),
      error: () => (this.errorMsg = 'Error cargando ingresos')
    });
  }

  guardar() {
    if (!this.descripcion || !this.monto || !this.fecha) {
      this.errorMsg = 'Completa todos los campos';
      return;
    }

    const payload = {
      categoria: this.categoria,
      descripcion: this.descripcion,
      monto: this.monto,
      fecha: this.fecha
    };

    if (this.editando && this.ingresoIdEditando) {
      // Actualizar
      this.ingresosService.updateIngreso(this.ingresoIdEditando, payload).subscribe({
        next: () => {
          this.resetFormulario();
          this.cargar();
        },
        error: () => (this.errorMsg = 'Error al actualizar ingreso')
      });
    } else {
      // Crear
      this.ingresosService.addIngreso(payload).subscribe({
        next: () => {
          this.resetFormulario();
          this.cargar();
        },
        error: () => (this.errorMsg = 'Error al agregar ingreso')
      });
    }
  }

  editar(item: any) {
    this.editando = true;
    this.ingresoIdEditando = item.id;
    this.categoria = item.categoria;
    this.descripcion = item.descripcion;
    this.monto = item.monto;
    this.fecha = item.fecha.slice(0, 10);
  }

  eliminar(id: number) {
    if (!confirm('¿Seguro de eliminar este ingreso?')) return;
    this.ingresosService.deleteIngreso(id).subscribe({
      next: () => this.cargar(),
      error: () => (this.errorMsg = 'Error al eliminar ingreso')
    });
  }

  cancelarEdicion() {
    this.resetFormulario();
  }

  private resetFormulario() {
    this.editando = false;
    this.ingresoIdEditando = null;
    this.categoria = 'Bautismos';
    this.descripcion = '';
    this.monto = null;
    this.fecha = new Date().toISOString().slice(0, 10);
    this.errorMsg = '';
  }
}
