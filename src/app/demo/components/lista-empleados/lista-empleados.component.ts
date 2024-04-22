import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/api/product';
import { EmpleadoService } from 'src/app/demo/service/empleado.service';
import { Empleado } from '../../api/empleado';



@Component({
    templateUrl: './lista-empleados.component.html',
    providers: [MessageService, ConfirmationService],
    styles: []
})
export class ListaEmpleadosComponent implements OnInit {

    empleados: Empleado[] = [];

    arrayPositions: any[] = [];

    positions: any;

    products: Product[] = [];

    loading: boolean = true;

    empleado: Empleado = {};

    product: Product = {};


    empleadoDialog: boolean = false;

    deletempleadoDialog: boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private empleadoService: EmpleadoService, private messageService: MessageService) { }

    ngOnInit() {

        this.empleadoService.getPositions().subscribe(data => {
            this.arrayPositions = data.positions;
            //this.positions = this.arrayPositions.map(item => ({ value: item, label: item }));
            this.positions = data.positions;
            console.error('quiero ver', this.positions);
        }, error => {
            console.error('Error al obtener los datos:', error);
        });


        this.empleadoService.getEmpleados().then(empleado => {
            this.empleados = empleado;
            this.loading = false;
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    openNew() {
        this.empleado = {};
        this.empleadoDialog = true;
    }

    hideDialog() {
        this.empleadoDialog = false;
    }

    saveEmpleado() {

        if (!this.validarCampo(this.empleado.nombre, 'Nombre')) return;
        if (!this.validarCampo(this.empleado.apellidos, 'Apellidos')) return;
        if (!this.validarCampo(this.empleado.puestoTrabajo, 'Puesto de Trabajo')) return;
        if (!this.validarCampo(this.empleado.fechaNacimiento, 'Fecha de Nacimiento')) return;


        if (this.empleado.nombre?.trim()) {
            if (this.empleado.id) {
                this.empleado.puestoTrabajo = this.empleado.puestoTrabajo.value ? this.empleado.puestoTrabajo.value : this.empleado.puestoTrabajo;
                this.empleados[this.findIndexById(this.empleado.id)] = this.empleado;
                this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Empleado Actualizado', life: 3000 });
            } else {
                this.empleado.id = this.createId();
                this.empleados.push(this.empleado);
                this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Empleado Creado', life: 3000 });
            }

            this.empleados = [...this.empleados];
            this.empleadoDialog = false;
            this.empleado = {};
        }
    }


    validarCampo(valor: string | undefined, nombreCampo: string): boolean {
        if (!valor) {
            this.messageService.add({ severity: 'warn', summary: 'Atencion!', detail: `${nombreCampo} es requerido`, life: 3000 });
            return false;
        }
        return true;
    }


    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.empleados.length; i++) {
            if (this.empleados[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    editEmpleado(empleado: Empleado) {
        this.empleado = { ...empleado };
        this.empleadoDialog = true;
    }

    deleteEmpleado(empleado: Empleado) {
        this.deletempleadoDialog = true;
        this.empleado = { ...empleado };
    }

    confirmDelete() {
        this.deletempleadoDialog = false;
        this.empleados = this.empleados.filter(val => val.id !== this.empleado.id);
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Empleado Eliminado', life: 3000 });
        this.empleado = {};
    }
}
