import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/api/product';
import { EmpleadoService } from 'src/app/demo/service/empleado.service';
import { Empleado } from '../../api/empleado';


@Component({
    templateUrl: './lista-empleados.component.html',
    providers: [MessageService, ConfirmationService],
    styles: [`
        :host ::ng-deep  .p-frozen-column {
            font-weight: bold;
        }

        :host ::ng-deep .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        :host ::ng-deep .p-progressbar {
            height:.5rem;
        }
    `]
})
export class ListaEmpleadosComponent implements OnInit {

    empleados: Empleado[] = [];

    statuses: any[] = [];

    products: Product[] = [];

    loading: boolean = true;

    empleado: Empleado = {};    

    product: Product = {};

    submitted: boolean = false;

    empleadoDialog: boolean = false;

    deletempleadoDialog: boolean = false;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private empleadoService: EmpleadoService, private messageService: MessageService) { }

    ngOnInit() {
        this.empleadoService.getEmpleados().then(empleado => {
            this.empleados = empleado;
            this.loading = false;
        });

        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];
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
        this.submitted = false;
        this.empleadoDialog = true;
    }

    hideDialog() {
        this.empleadoDialog = false;
        this.submitted = false;
    }

    saveEmpleado() {
        this.submitted = true;

        /*if (this.product.name?.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.empleadoDialog = false;
            this.product = {};
        }*/
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
