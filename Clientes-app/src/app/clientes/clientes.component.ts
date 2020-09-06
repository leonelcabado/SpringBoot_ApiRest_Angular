import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../services/cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(private service: ClienteService) { }

  ngOnInit() {
    this.service.getClientes().subscribe(response => {
      this.clientes = response;
    })
  }

  delete(cliente: Cliente): void{
    
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.service.delete(cliente.id)
        .subscribe( response => {
          this.clientes = this.clientes.filter(cli => cli !== cliente)
          swal(
            'Cliente Eliminado!',
            `Cliente ${cliente.nombre} eliminado con éxito!`,
            'success'
          )})
      } 
    })
  }

}
