# ionic-angular
## Versiones para instalación
- Ionic 7.2.1
- Angular cli 19.0.0
- Npm 10.9.0
- Node 22.12.0
- capacitor

## Ejecutar el proyecto en un ambiente local o desarrollo 
```bash
1. cd wearedev
2. npm i
3. ionic serve
```
## Tecnolgia utilizada para almacenamiento local 
- LocalStorage: Se uso ya que habia poco tiempo para realizar otra implementación y aparte es muy optimo 
y cumple con los requisitos de guardar, eliminar y listar datos de manera local y nativa en los dispositivos moviles
## Criterios de creación de carpeta 
- Se usa por module o por feature lo cual permite tener toda la solución implementada por funcionalidad y permite escalar de manera eficiente los archivos sin que estos se mezclen.
## Criterio para mostrar alerta de vencimiento
- Se uso una validación por medio de fechas que si la fecha de la tarea es menor a la fecha actual + 24 horas es decir a la fecha actual le sumo 24 horas y si esta es menor a la fecha de la tarea se arroja la alerta
## Ubicación de APK
- La APK de la aplicación va a estar en la raiz del proyecto con el nombre 
- app-debug.apk
## Evidencias de modulo funcional
![Editar tareas](https://github.com/bpabon/ionic-angular/blob/main/screens/editar%20tareas.png)
![Lista tarea](https://github.com/bpabon/ionic-angular/blob/main/screens/Listado%20de%20tareas.png)
