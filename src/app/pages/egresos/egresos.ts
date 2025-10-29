import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EgresosService } from '../../services/egresos.service';

@Component({
  selector: 'app-egresos',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf],
  templateUrl: './egresos.html',
  styleUrls: ['./egresos.css']
})
export class EgresosComponent {
  categorias = [
    'Mantenimiento',
    'Servicios',
    'Eventos',
    'Donaciones',
    'Personal',
    'Otros'
  ];

  categoria = 'Mantenimiento';
  descripcion = '';
  monto: number | null = null;
  fecha = new Date().toISOString().slice(0, 10);
  egresos: any[] = [];
  errorMsg = '';

  editando = false;
  egresoIdEditando: number | null = null;

  constructor(private egresosService: EgresosService) {
    this.cargar();
  }

  cargar() {
    this.egresosService.getEgresos().subscribe({
      next: (data: any[]) => (this.egresos = data),
      error: () => (this.errorMsg = 'Error cargando egresos')
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

    if (this.editando && this.egresoIdEditando) {
      this.egresosService.updateEgreso(this.egresoIdEditando, payload).subscribe({
        next: () => {
          this.resetFormulario();
          this.cargar();
        },
        error: () => (this.errorMsg = 'Error al actualizar egreso')
      });
    } else {
      this.egresosService.addEgreso(payload).subscribe({
        next: () => {
          this.resetFormulario();
          this.cargar();
        },
        error: () => (this.errorMsg = 'Error al agregar egreso')
      });
    }
  }

  editar(item: any) {
    this.editando = true;
    this.egresoIdEditando = item.id;
    this.categoria = item.categoria;
    this.descripcion = item.descripcion;
    this.monto = item.monto;
    this.fecha = item.fecha.slice(0, 10);
  }

  eliminar(id: number) {
    if (!confirm('¿Seguro de eliminar este egreso?')) return;
    this.egresosService.deleteEgreso(id).subscribe({
      next: () => this.cargar(),
      error: () => (this.errorMsg = 'Error al eliminar egreso')
    });
  }

  cancelarEdicion() {
    this.resetFormulario();
  }

  private resetFormulario() {
    this.editando = false;
    this.egresoIdEditando = null;
    this.categoria = 'Mantenimiento';
    this.descripcion = '';
    this.monto = null;
    this.fecha = new Date().toISOString().slice(0, 10);
    this.errorMsg = '';
  }
}
