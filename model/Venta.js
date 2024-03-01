export default class Venta {

    /**
     * Constructor de la clase venta.
     * Esta clase es la que se maneja de último en la lógica de la app.
     * Por eso la cantidad de parámetros que tiene.
     * @param {*} codigo 
     * @param {*} fecha 
     * @param {*} total 
     * @param {*} cliente 
     * @param {*} listaProductos 
     * @param {*} listaDetalles
     */
    constructor(codigo, fecha, total, cliente, listaDetalles) {
        this.codigo = codigo;
        this.fecha = fecha;
        this.total = total;
        this.cliente = cliente;
        this.listaDetalles = listaDetalles;
    }

}