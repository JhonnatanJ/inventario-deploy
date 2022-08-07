import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalReservaService {
  modal:Boolean=false;
  constructor() { }

  openModal(){
    this.modal=true;
  }

  cerrarModal(){
    this.modal=false;
  }
}
