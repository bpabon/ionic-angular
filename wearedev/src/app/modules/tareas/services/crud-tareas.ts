import { Injectable } from '@angular/core';
import { EstadoTarea, Tarea } from '../interfaces/tarea.modelo';

@Injectable({
  providedIn: 'root',
})
export class CrudTareas {
  private readonly CLAVE_STORAGE = 'TareasWeAreDev';
  // Método solo para ver las tareas activas (no eliminadas)
  public obtenerTareasActivas(): Tarea[] {
    const datos = this.obtenerTodasLasTareas();
    return datos.filter((tarea) => !tarea.estaEliminada);
  }
  // Método para obtener todas las tareas, incluyendo las eliminadas
  public obtenerTodasLasTareas(): Tarea[] {
    const datos = localStorage.getItem(this.CLAVE_STORAGE);
    return datos ? JSON.parse(datos) : [];
  }
  // Me permite guardar la tarea en el localStorage
  private guardarTareas(tareas: Tarea[]): void {
    localStorage.setItem(this.CLAVE_STORAGE, JSON.stringify(tareas));
  }
  // Agregar una nueva tarea al localStorage con un ID único generado automáticamente
  public agregarTarea(tarea: Partial<Tarea>): void {
    const nuevaTarea: Tarea = {
      id: crypto.randomUUID(),
      titulo: tarea.titulo ?? 'Sin título',
      descripcion: tarea.descripcion?? '',
      estado: 'Pendiente',
      fechaVencimiento: tarea.fechaVencimiento ?? new Date().toISOString(),
      fechaCreacion: new Date().toISOString(),
      fechaModificacion: null,
      fechaEliminado: null,
      estaEliminada: false,
    }
    const tareas = this.obtenerTodasLasTareas();
    tareas.push(nuevaTarea);
    this.guardarTareas(tareas);
  }
  // Modificar la tarea por medio de su ID, actualizando solo los campos proporcionados y la fecha de modificación
  public modificarTarea(id: string, tarea: Partial<Tarea>): void {
    const tareas = this.obtenerTodasLasTareas();
    const indice = tareas.findIndex(t => t.id === id);
    if (indice !== -1) {
      const tareaExistente = tareas[indice];
      tareas[indice] = {
        ...tareaExistente,
        ...tarea,
        fechaModificacion: new Date().toISOString(),
      };
      this.guardarTareas(tareas);
    }
  }
  // Se cambia el estado de la tarea por medio de su ID, actualizando solo el campo de estado y la fecha de modificación
  public cambiarEstadoTarea(id: string, nuevoEstado: EstadoTarea): void {
    this.modificarTarea(id, { estado: nuevoEstado });
  }
  // Eliminar la tarea de forma lógica por medio de su ID, marcándola como eliminada y actualizando la fecha de eliminación y modificación
  public eliminarTareaLogicamente(id: string): void {
    const tareas = this.obtenerTodasLasTareas();
    const indice = tareas.findIndex((t) => t.id === id);
    if (indice !== -1) {
      tareas[indice].estaEliminada = true;
      tareas[indice].fechaEliminado = new Date().toISOString();
      tareas[indice].fechaModificacion = new Date().toISOString();
      this.guardarTareas(tareas);
    }
  }
  // Tareas que vencen entre "ahora" y "mañana a esta misma hora"
  obtenerTareasProximasAVencer(): Tarea[] {
    const ahora = new Date();
    const mañana = new Date(ahora.getTime() + (24 * 60 * 60 * 1000));
    return this.obtenerTareasActivas().filter(tarea => {
      const fechaVencimiento = new Date(tarea.fechaVencimiento);
      return fechaVencimiento <= mañana;
    });
  }
}
