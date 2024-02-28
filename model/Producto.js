export default class Producto {

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

    getCodigo() {
        return this.codigo;
    }

    getNombre() {
        return this.nombre;
    }

    getPrecio() {
        return this.precio;
    }

    getCantidad() {
        return this.cantidad;
    }

    setCodigo(codigo) {
        this.codigo = codigo;
    }

    setNombre(nombre) {
        this.nombre = nombre;
    }

    setPrecio(precio) {
        this.precio = precio;
    }

    setCantidad(cantidad) {
        this.cantidad = cantidad;
    }

    toString() {
        return `Producto: ${this.nombre}, Codigo: ${this.codigo}, Precio: ${this.precio}, Cantidad: ${this.cantidad}`;
    }

}