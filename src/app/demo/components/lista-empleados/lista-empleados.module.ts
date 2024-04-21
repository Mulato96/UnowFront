import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { ListaEmpleadosComponent } from './lista-empleados.component';
import { ListaEmpleadosRoutingModule } from './lista-empleados-routing.module';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
    imports: [
        CommonModule,
        ListaEmpleadosRoutingModule,
        FormsModule,
        TableModule,
        RatingModule,
        ButtonModule,
        SliderModule,
        InputTextModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        DropdownModule,
        ProgressBarModule,
        ToastModule,
        DialogModule,
        CalendarModule,
        PaginatorModule 
    ],
    declarations: [ListaEmpleadosComponent]
})
export class ListaEmpleadosModule { }
