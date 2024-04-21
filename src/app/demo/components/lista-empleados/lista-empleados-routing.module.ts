import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaEmpleadosComponent } from './lista-empleados.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListaEmpleadosComponent }
    ])],
    exports: [RouterModule]
})
export class ListaEmpleadosRoutingModule { }
