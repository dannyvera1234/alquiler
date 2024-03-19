import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService  {

  API_URI = environment._APIUrl;
  tipoPersona: string = 'compradores';
  constructor(
    private http: HttpClient
  ) { }



  save(data: any, idCliente?: any){

    if (idCliente) {
      return this.http.put(`${this.API_URI}/${this.tipoPersona}/${idCliente}`,data);
    }

    return this.http.post(`${this.API_URI}/${this.tipoPersona}`,data);
  }

  getClientes(){
    return this.http.get(`${this.API_URI}/${this.tipoPersona}`);
  }

  /**
   * Permite eliminar un registro en base a su id
   * @param id : string
   */
  deleteClient(id: number){

    // if (id.includes(',')) {
    //   return this.deleteMany(id);
    // }
    
    return this.http.delete(`${this.API_URI}/${this.tipoPersona}/${id}`)
    .pipe(
      tap((resp: any) => {
        console.log(resp);
      })
    );
  }

  getCliente(id: string){
    return this.http.get(`${this.API_URI}/${this.tipoPersona}/${id}`)
    .pipe(
      tap((resp: any) => {
        console.log(resp);
      })
    );
  }

  /**
   * Permite eliminar varios registros a la vez en base a los ids
   * @param ids : string, ids separados por coma
   * @returns
   */
  private deleteMany(ids: string){
    return this.http.delete(`${this.API_URI}/${this.tipoPersona}/eliminarMasivo`,{
      params: {
        ids
      }
    });
  }

 
}
