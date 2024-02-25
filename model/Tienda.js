export default class Tienda {

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

    getClientes() {
        return this.hashMapClientes;
    }

    //Ejemplo de un metodo para agregar un producto

    /**
     * Test para saber que si se conecto la tienda correctamente
     */
    test() {
        alert('hello world');
    }

    /**
     * Registra un cliente siempre y cuando su id no exista
     * @param {*} identificacion 
     * @param {*} nombre 
     * @param {*} direccion 
     */
    registrarCliente(identificacion, nombre, direccion) {
        //Verifica si la identificacion ya existe
        if (this.hashMapClientes.hasOwnProperty(identificacion)) {
            alert("El cliente con identificacion " + identificacion + " ya está registrado")
        } else {
            //Si no existe se agrega al hashMap
            this.hashMapClientes[identificacion] = {nombre, direccion};
            alert("Cliente registrado con exito")
            //Imprimo el hashMap de clientes para ver si si estan xd
            this.imprimirClientes();
        }
    }

    /**
     * Elimina un cliente del hashMap de clientes dado su id
     * @param {*} idCliente 
     */
    eliminarCliente(idCliente) {
        // Verifica si el cliente existe
        if (this.hashMapClientes.hasOwnProperty(idCliente)) {
            delete this.hashMapClientes[idCliente];
            alert(`Cliente con identificación ${idCliente} eliminado.`);
        } else {
            alert(`El cliente con identificación ${idCliente} no existe.`);
        }
    }

    /**
     * Imprime el hashMap de clientes
     */
    imprimirClientes() {
        console.log("Listado de clientes: ")
        for (let identificacion in this.hashMapClientes) {
            console.log(`Identificación: ${identificacion}, Nombre: ${this.hashMapClientes[identificacion].nombre}, Dirección: ${this.hashMapClientes[identificacion].direccion}`);
        }
    }

}

