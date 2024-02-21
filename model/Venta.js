class Venta {

    /**
     * Constructor de la clase venta
     * @param {*} codigo 
     * @param {*} fecha 
     * @param {*} total 
     * @param {*} cliente 
     * @param {*} listaProductos 
     * @param {*} listaDetalles
     */
    constructor(codigo, fecha, total, cliente, listaProductos, listaDetalles) {
        this.codigo = codigo;
        this.fecha = fecha;
        this.total = total;
        this.cliente = cliente;
        this.listaProductos = listaProductos;
        this.listaDetalles = listaDetalles;
    }

}