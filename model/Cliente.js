class Cliente {

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

}