export class EstadoCliente extends Error {
    constructor(mensaje) {
        super(mensaje)
        this.name = 'EstadoCliente'
    }
}

export class ErrorDeValidacion extends Error {
    constructor(mensaje) {
        super(mensaje)
        this.name = 'ErrorDeValidacion'
    }
}


/*
En el controlador de la implementación se importa lo siguiente.
import { ExcepcionEjemplo } from '../model/utils/Excepciones'
import {logError} from '../model/utils/logger'
import Swal from 'sweetalert2'
*/