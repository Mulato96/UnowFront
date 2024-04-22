import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from '../api/empleado';
import { Observable } from 'rxjs';

@Injectable()
export class EmpleadoService {
    private apiUrl = 'https://ibillboard.com/api/positions';

    constructor(private http: HttpClient) { }


/**
 * Obtiene la lista de empleados desde el servicio.
 * @returns Un Observable que emite la lista de empleados.
 */
    getEmpleados() {
        return this.http.get<any>('assets/demo/data/empleados.json')
            .toPromise()
            .then(res => res.data as Empleado[])
            .then(data => data);
    }

/**
 * Obtiene las posiciones disponibles desde el servidor.
 * Este método realiza una solicitud HTTP GET al servidor para obtener la lista de posiciones disponibles.
 * @returns Un Observable que emite un objeto con la lista de posiciones.
 */
    getPositions(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}
