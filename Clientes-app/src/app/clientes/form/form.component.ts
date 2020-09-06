import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  private cliente: Cliente = new Cliente()
  private titulo: String = "Crear Cliente"

  constructor(private service: ClienteService, 
    private router:Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente()
  }

  cargarCliente():void{
    this.activateRoute.params
    .subscribe(params => {
      let id = params['id']
      if(id){
        this.service.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })
  }

  create():void{
    this.service.create(this.cliente)
    .subscribe( 
      cliente => {this.router.navigate(['/clientes'])
      swal('Nuevo cliente', `Cliente ${cliente.nombre} creado con éxito!`,'success')
    });
  }

  update():void{
    this.service.update(this.cliente)
    .subscribe(cliente => {
      this.router.navigate(['/clientes'])
      swal('Cliente Actualizado', `Cliente ${cliente.nombre} actualizado con éxito!`, 'success')
    })
  }

}
