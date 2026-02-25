export type EstadoTarea = 'Pendiente' | 'Completada' | 'Pospuesta';
export interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  estado: EstadoTarea;
  fechaVencimiento: string;
  fechaCreacion: string;
  fechaModificacion: string | null;
  fechaEliminado: string | null;
  estaEliminada: boolean;
}
