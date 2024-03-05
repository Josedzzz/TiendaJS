export class EstadoCliente extends Error {
    constructor(mensaje) {
        super(mensaje)
        this.name = 'EstadoCliente'
    }
}

export class EstadoProducto extends Error {
    constructor(mensaje) {
        super(mensaje)
        this.name = 'EstadoProducto'
    }
}

export class ErrorDeValidacion extends Error {
    constructor(mensaje) {
        super(mensaje)
        this.name = 'ErrorDeValidacion'
    }
}

