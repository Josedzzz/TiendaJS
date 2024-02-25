class Tienda {

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

    //Ejemplo de un metodo para agregar un producto

    /**
     * Agrega un producto al hashMap de productos
     * @param {*} id 
     * @param {*} producto 
     */
    agregarProducto(id, producto) {
        this.productos[id] = producto;
    }

    /**
     * Método para dar un carrito de compras a un cliente.
     * Este método es para dar un carrito de compras a un cliente. No sé si deba manejar en Tienda o en Venta. La idea queda ahí. =)
     */
    darCarrito() {
        //Código para dar un carrito de compras a un cliente.

    }

}