import { Injectable } from '@angular/core';
import { of,Observable,throwError } from 'rxjs';
import { Cliente } from '../clientes/cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint = "http://localhost:8080/api/clientes";
  private httpHeaders = new HttpHeaders({ 'Content-Type':'application/json'})
  
  constructor(private http: HttpClient, private router: Router) { }

  getClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }

  create(cliente: Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint,cliente,{headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e=>{
        swal(e.error.mensaje, e.error.error, 'error')
        return throwError(e)
      })
    );
  }

  getCliente(id):Observable<Cliente>{
    return this.http.get<Cliente>(this.urlEndPoint+"/"+id).pipe(
      catchError(e=>{
        this.router.navigate(['/clientes'])
        swal('Error al editar', e.error.mensaje, 'error')
        return throwError(e)
      })
    );
  }

  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(this.urlEndPoint+ "/" +cliente.id, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e=>{
        swal(e.error.mensaje, e.error.error, 'error')
        return throwError(e)
      })
    );
  }

  delete(id):Observable<Cliente>{
    return this.http.delete<Cliente>(this.urlEndPoint+"/"+id, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        swal(e.error.mensaje, e.error.error, 'error')
        return throwError(e)
      })
    );
  }
}
