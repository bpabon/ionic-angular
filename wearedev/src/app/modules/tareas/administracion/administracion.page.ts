import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  trashOutline,
  createOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
  add,
} from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonBadge,
  IonCard,
  IonListHeader,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSelect,
  IonSelectOption,
  IonModal,
  IonDatetime,
  IonDatetimeButton,
  IonButtons,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import { CrudTareas } from '../services/crud-tareas';
import { IonicModule } from '@ionic/angular';
import { Tarea, EstadoTarea } from '../interfaces/tarea.modelo';
import { addIcons } from 'ionicons';
@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.page.html',
  styleUrls: ['./administracion.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonListHeader,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonBadge,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonSelect,
    IonSelectOption,
    IonModal,
    IonDatetime,
    IonDatetimeButton,
    IonButtons,
    IonFab,
    IonFabButton,
  ],
})
export class AdministracionPage implements OnInit {
  tareasActivas: Tarea[] = [];
  tareasUrgentes: Tarea[] = [];
  tareaEnEdicion: Tarea | null = null;
  estaModalAbierto = false;

  constructor(private crudTareas: CrudTareas) {
    addIcons({
      trashOutline,
      createOutline,
      alertCircleOutline,
      checkmarkCircleOutline,
      add,
    });
  }

  ngOnInit() {
    this.cargarTareas();
  }
  // Listar las tareas que estan guardadas en el localStorage
  public cargarTareas() {
    this.tareasActivas = this.crudTareas.obtenerTareasActivas();
    this.tareasUrgentes = this.crudTareas.obtenerTareasProximasAVencer();
  }
  // Obj para la creación de nueva tarea
  prepararCreacion() {
    this.tareaEnEdicion = {
      id: '',
      titulo: '',
      descripcion: '',
      estado: 'Pendiente',
      fechaVencimiento: new Date().toISOString(),
      fechaCreacion: new Date().toISOString(),
      fechaModificacion: null,
      fechaEliminado: null,
      estaEliminada: false,
    };
    this.estaModalAbierto = true;
  }
  prepararEdicion(tarea: Tarea) {
    this.tareaEnEdicion = { ...tarea };
    this.estaModalAbierto = true;
  }
  guardarCambios() {
    if (this.tareaEnEdicion) {
      // Si el Id de la tarea es vacío inserto en el localstorage
      if (this.tareaEnEdicion.id === '') {
        this.crudTareas.agregarTarea({
          titulo: this.tareaEnEdicion.titulo,
          descripcion: this.tareaEnEdicion.descripcion,
          fechaVencimiento: this.tareaEnEdicion.fechaVencimiento,
        });
      } else {
        // Si la tarea tiene un ID, se modifica la tarea existente
        this.crudTareas.modificarTarea(
          this.tareaEnEdicion.id,
          this.tareaEnEdicion,
        );
      }

      this.estaModalAbierto = false;
      this.tareaEnEdicion = null;
      this.cargarTareas();
    }
  }
  public actualizarEstado(tarea: Tarea, evento: any) {
    const nuevoEstado = evento.detail.value as EstadoTarea;
    this.crudTareas.cambiarEstadoTarea(tarea.id, nuevoEstado);
    this.cargarTareas();
  }
  public eliminarTarea(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      this.crudTareas.eliminarTareaLogicamente(id);
      this.cargarTareas();
    }
  }
  // Retorna booleano para determinar si la tarea es urgente, es decir, si su fecha de vencimiento es menor 24 horas a partir de la fecha actual
  esUrgente(id: string): boolean {
    return this.tareasUrgentes.some((t) => t.id === id);
  }
}
