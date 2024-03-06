class CarritoCompras {

    /**
     * Constructor de la clase carritoCompras
     * @param {*} cliente 
     * @param {*} hashmapProductos 
     */
    constructor(idProducto, producto) {
        this.idProducto = idProducto;
        this.producto = producto;
    }

    constructor(cliente, hashmapProductos) {
        this.cliente = cliente;
        this.hashmapProductos = hashmapProductos;
    }

}