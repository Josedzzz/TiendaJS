import Cliente from './Cliente.js'

export default class Tienda {

    //El histórico de ventas queda pendiente. Toca decidir si cambiamos la lista de ventas por el historico de ventas o si dejamos ambas. Robinson recomendó usar un LinkedList para el histórico de ventas.
    //Por otro lado, hay un atributo Inventario de Productos al cuál no le veo uso útil. No sé si lo dejamos o lo quitamos.

    /**
     * Constructor de la clase tienda la cual va tener la logica de la app
     * La lista de productos va de la forma <Código del producto, Producto>
     * La lista de clientes va de la forma <Identificación del cliente, Cliente>
     * La lista de carritos es un caso especial, se va a usar para crear carritos con productos aleatorios del inventario y darselo a los clientes por sorteo o por número de venta. Por ende, también hay que manejar la cantidad de ventas que se hacen en la tienda.
     * La cantidad de ventas justifica el uso de la lista de carritos
     * @param {*} nombre 
     * @param {*} direccion 
     */
    constructor(nombre, direccion) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.cantidadVentas = 0;
        this.hashMapProductos = new Map(); //Se inicializa un hashMap con new Map().  Se puede usar un objeto {} Pero Map es mas eficiente.
        this.hashMapClientes = new Map(); 
        this.listaVentas = []; //Se inicialzia una lista con [], es muy similar a un arraylist en Java. 
        this.listaCarritos = [];
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

    /* Registra un cliente siempre y cuando su id no exista
    * @param {*} identificacion 
    * @param {*} nombre 
    * @param {*} direccion 
    */
    registrarCliente(identificacion, nombre, direccion) {
        if (this.isCamposValidosCliente(identificacion, nombre, direccion)) {
            if (this.hashMapClientes.has(identificacion)) {
                alert("El cliente con identificacion " + identificacion + " ya está registrado")
            } else {
                const cliente = new Cliente(identificacion, nombre, direccion);
                this.hashMapClientes.set(identificacion, cliente); 
                alert("Cliente registrado con éxito");
                //Imprimir el hashMap de clientes para verificar si se registró correctamente
                console.log("Se registró el cliente:");
                this.imprimirClientes();
            }        
        } else {
            alert("Por favor asegurese de que los campos de cliente esten llenos");
        }
    }

   /**
    * Elimina un cliente del hashMap de clientes dado su id
    * @param {*} idCliente 
    */
    eliminarCliente(idCliente) {
        // Verifica si el cliente existe en el Map
        if (this.hashMapClientes.has(idCliente)) {
            this.hashMapClientes.delete(idCliente);
            this.imprimirClientes();
            alert(`Cliente con identificación ${idCliente} eliminado.`);
        } else {
            alert(`El cliente con identificación ${idCliente} no existe.`);
        }
    }

    /**
     * Actualiza el nombre y direccion de un cliente
     * @param {*} identificacion 
     * @param {*} nuevoNombre 
     * @param {*} nuevaDireccion 
     */
    actualizarCliente(identificacion, nuevoNombre, nuevaDireccion) {
        if (this.isCamposValidosCliente(identificacion, nuevoNombre, nuevaDireccion)) {
            if (this.hashMapClientes.has(identificacion)) {
                const cliente = this.hashMapClientes.get(identificacion);
                cliente.setNombre(nuevoNombre);
                cliente.setDireccion(nuevaDireccion);
                alert(`Cliente con identificación ${identificacion} actualizado.`);
            } else {
                alert(`El cliente con identificación ${identificacion} no existe.`);
            }
        } else {
            alert("Por favor asegurese de que los campos de cliente esten llenos");
        }
    }

    /**
     * Verifica que los campos para la manipulacion de clientes no esten vacios
     * @param {*} identificacion 
     * @param {*} nombre 
     * @param {*} direccion 
     * @returns 
     */
    isCamposValidosCliente(identificacion, nombre, direccion) {
        if (!identificacion || !nombre || !direccion) {
            return false;
        } else {
            return true;
        } 
    }

   /**
    * Imprime el hashMap de clientes
    */
    imprimirClientes() {
        this.hashMapClientes.forEach((cliente) => {
            console.log(cliente.toString());
        });
    }


}

