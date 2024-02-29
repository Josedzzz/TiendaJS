export default class Cliente {

    /**
     * Constructor de la clase cliente.
     * Cuando se crea el Cliente solo se ve necesario tener la identificación, nombre y dirección.
     * Cuenta con una lista de compras que se irá llenando a medida que el cliente vaya comprando productos.
     * A su vez el carrito de compras se irá llenando a medida que el cliente vaya agregando productos al carrito, tener en cuenta que también se puede eliminar productos del carrito.
     * La forma de agregar productos sera de la forma <Código del producto, Cantidad del Producto>
     * @param {*} identificacion 
     * @param {*} nombre 
     * @param {*} direccion 
     */
    constructor(identificacion, nombre, direccion) {
        this.identificacion = identificacion;
        this.nombre = nombre;
        this.direccion = direccion;
        this.carritoCompras = new Map();
        this.listaCompras = [];
    }

    /**
     * Metodo para obtener la identificacion de un cliente 
     * @returns 
     */
    getIdentificacion(identificacion) {
        return this.identificacion;
    }

    /**
     * Metodo para obtener el nombre del cliente
     * @returns 
     */
    getNombre() {
        return this.nombre;
    }

    /**
     * Metodo para obtener la direccion del cliente
     * @returns 
     */
    getDireccion() {
        return this.direccion;
    }

    /**
     * Metodo para obtener el carrito de compras de un cliente
     * @returns 
     */
    getCarritoCompras() {
        return this.carritoCompras;
    }

    /**
     * Metodo para establecer el nombre del cliente
     * @param {*} nuevoNombre 
     */
    setNombre(nombre) {
        this.nombre = nombre;
    }

    /**
     * Metodo para establecer la direccion
     * @param {*} direccion 
     */
    setDireccion(direccion) {
        this.direccion = direccion;
    }

    toString() {
        return `Cliente: ${this.nombre}, Identificacion: ${this.identificacion}, Direccion: ${this.direccion}`;
    }

}