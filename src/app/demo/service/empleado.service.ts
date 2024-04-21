import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from '../api/empleado';
import { Observable } from 'rxjs';

@Injectable()
export class EmpleadoService {
    private apiUrl = 'https://ibillboard.com/api/positions';

    constructor(private http: HttpClient) { }


    getEmpleados() {
        return this.http.get<any>('assets/demo/data/empleados.json')
            .toPromise()
            .then(res => res.data as Empleado[])
            .then(data => data);
    }
    
    getPositions(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}
