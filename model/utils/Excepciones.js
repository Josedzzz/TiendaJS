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
