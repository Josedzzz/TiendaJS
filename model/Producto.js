class Producto {

    /**
     * Constructor de la clase producto
     * @param {*} codigo 
     * @param {*} nombre 
     * @param {*} precio 
     * @param {*} cantidad cantidad del producto en el inventario de la tienda
     */
    constructor(codigo, nombre, precio, cantidad) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }

}