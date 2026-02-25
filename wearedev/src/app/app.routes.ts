import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'administracion',
    pathMatch: 'full',
  },
  {
    path: 'administracion',
    loadComponent: () => import('./modules/tareas/administracion/administracion.page').then( m => m.AdministracionPage)
  },
];
