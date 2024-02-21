class Tienda {

    /**
     * Constructor de la clase tienda la cual va tener la logica de la app
     * @param {*} nombre 
     * @param {*} direccion 
     */
    constructor(nombre, direccion) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.hashMapProductos = {}; //Se inicializa un hashMap con {}
        this.hashMapClientes = {};
        this.listVentas = []; //Se inicialzia una lista con []
        this.listCarritos = [];
    }

    //Ejemplo de un metodo para agregar un producto

    /**
     * Agrega un producto al hashMap de productos
     * @param {*} id 
     * @param {*} producto 
     */
    agregarProducto(id, producto) {
        this.productos[id] = producto;
    }

}