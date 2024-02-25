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
        this.listaProductos = new Map(); //Se inicializa un hashMap con new Map().  Se puede usar un objeto {} Pero Map es mas eficiente.
        this.listaClientes = new Map(); 
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

