import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ListaEmpleadosComponent } from './lista-empleados.component';
import { EmpleadoService } from 'src/app/demo/service/empleado.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { Empleado } from '../../api/empleado';

describe('ListaEmpleadosComponent', () => {
  let component: ListaEmpleadosComponent;
  let fixture: ComponentFixture<ListaEmpleadosComponent>;
  let empleadoServiceSpy: jasmine.SpyObj<EmpleadoService>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    const empleadoService = jasmine.createSpyObj('EmpleadoService', ['getPositions', 'getEmpleados']);
    const messageService = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      declarations: [ ListaEmpleadosComponent ],
      providers: [
        { provide: EmpleadoService, useValue: empleadoService },
        { provide: MessageService, useValue: messageService }
      ]
    })
    .compileComponents();

    empleadoServiceSpy = TestBed.inject(EmpleadoService) as jasmine.SpyObj<EmpleadoService>;
    messageServiceSpy = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEmpleadosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load employees correctly', fakeAsync(() => {
    // Arrange
    const mockEmpleados: Empleado[] = [
      { id: '1', nombre: 'Empleado 1', apellidos: 'Apellidos 1', puestoTrabajo: 'Puesto 1', fechaNacimiento: '01/01/2000' },
      { id: '2', nombre: 'Empleado 2', apellidos: 'Apellidos 2', puestoTrabajo: 'Puesto 2', fechaNacimiento: '02/02/2000' }
    ];
    empleadoServiceSpy.getEmpleados.and.returnValue(Promise.resolve(mockEmpleados));

    // Act
    fixture.detectChanges();
    tick();

    // Assert
    expect(component.empleados).toEqual(mockEmpleados);
  }));

  it('should display error message when nombre field is empty', () => {
    // Arrange
    component.empleado = { apellidos: 'Apellidos', puestoTrabajo: 'Puesto', fechaNacimiento: '01/01/2000' };
    
    // Act
    component.saveEmpleado();

    // Assert
    expect(messageServiceSpy.add).toHaveBeenCalledWith({ severity: 'warn', summary: 'Atencion!', detail: 'Nombre es requerido', life: 3000 });
  });
  

});
