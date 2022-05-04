import { timeStamp } from 'console';

export class Producto {
  id_prestamo: number;
  fecha_prestamo: Date;
  estado_entrega: string;
  lugar_destino: string;
  cantidad: number;
  estado_devolucion: string;
  externo_interno: number;
  fecha_devolucion: Date;
  id_person_so: string;
  id_equipo: string;
  devuelto: boolean;

  constructor(
    id_prestamo: number,
    fecha_prestamo: Date,
    estado_entrega: string,
    lugar_destino: string,
    cantidad: number,
    estado_devolucion: string,
    fecha_devolucion: Date,
    id_person_so: string,
    id_equipo: string,
    externo_interno: number,
    devuelto: boolean
  ) {
    this.id_prestamo = id_prestamo;
    this.fecha_prestamo = fecha_prestamo;
    this.estado_entrega = estado_entrega;
    this.lugar_destino = lugar_destino;
    this.cantidad = cantidad;
    this.estado_devolucion = estado_devolucion;
    this.fecha_devolucion = fecha_devolucion;
    this.externo_interno = externo_interno;
    this.id_person_so = id_person_so;
    this.id_equipo = id_equipo;
    this.devuelto=devuelto;
  }
  
}
