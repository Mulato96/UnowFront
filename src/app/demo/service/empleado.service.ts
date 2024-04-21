import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from '../api/empleado';

@Injectable()
export class EmpleadoService {

    constructor(private http: HttpClient) { }
   

    getEmpleados() {
        return this.http.get<any>('assets/demo/data/empleados.json')
            .toPromise()
            .then(res => res.data as Empleado[])
            .then(data => data);
    }
}
