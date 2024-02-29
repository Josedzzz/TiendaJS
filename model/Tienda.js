import Cliente from './Cliente.js'
import Producto from './Producto.js';

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

    getProductos() {
        return this.hashMapProductos;
    }

    //CRUD DE CLIENTES --------------------------------------------------------------------------------

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
                //Imprimir el hashMap de clientes para verificar si se registro correctamente
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

    //CRUD DE PRODUCTOS -----------------------------------------------------------------------------------

    /**
     * Registra un producto siempre y cuando su codigo no exista
     * @param {*} codigo 
     * @param {*} nombre 
     * @param {*} precio 
     * @param {*} cantidad 
     */
    registrarProducto(codigo, nombre, precio, cantidad) {
        if (this.isCamposValidosProducto(codigo, nombre, precio, cantidad)) {
            if (this.hashMapProductos.has(codigo)) {
                alert("El producto con el codigo " + codigo + " ya está registrado");
            } else {
                const producto = new Producto(codigo, nombre, precio, cantidad);
                this.hashMapProductos.set(codigo, producto);
                alert("Producto registrado con éxito");
                //Imprimir el hashMap de productos para verificar si se registro correctamente
                console.log("Se registró el producto")
                this.imprimirProductos();
            }
        } else {
            alert("Por favor asegurese de que los campos del producto esten llenos");
        }
    }

    /**
     * Elimina un producto del hashMap de productos dado su codigo
     * @param {*} codigoProducto 
     */
    eliminarProducto(codigoProducto) {
        if (this.hashMapProductos.has(codigoProducto)) {
            this.hashMapProductos.delete(codigoProducto);
            this.imprimirProductos();
            alert(`Producto con código ${codigoProducto} eliminado.`);
        } else {
            alert(`Producto con código ${codigoProducto} no existe.`);
        }
    }

    /**
     * Actualiza el nombre, el precio y la cantidad de un producto 
     * @param {*} codigo 
     * @param {*} nuevoNombre 
     * @param {*} nuevoPrecio 
     * @param {*} nuevaCantidad 
     */
    actualizarProducto(codigo, nuevoNombre, nuevoPrecio, nuevaCantidad) {
        if (this.isCamposValidosProducto(codigo, nuevoNombre, nuevoPrecio, nuevaCantidad)) {
            if (this.hashMapProductos.has(codigo)) {
                const producto = this.hashMapProductos.get(codigo);
                producto.setNombre(nuevoNombre);
                producto.setPrecio(nuevoPrecio);
                producto.setCantidad(nuevaCantidad);
                alert(`Producto con código ${codigo} actualizado.`);
            } else {
                alert(`El producto con código ${codigo} no existe.`);
            }
        } else {
            alert("Por favor asegurese de que los campos de producto esten llenos");
        }
    }

    /**
     * Verifica que los campos para la manipulacion de productos no esten vacios
     * @param {*} nombre 
     * @param {*} codigo 
     * @param {*} precio 
     * @param {*} cantidad 
     * @returns 
     */
    isCamposValidosProducto(codigo, nombre, precio, cantidad) {
        if (!codigo || !nombre || !precio || !cantidad) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Imprime el hashMap de productos
     */
    imprimirProductos() {
        this.hashMapProductos.forEach((producto) => {
            console.log(producto.toString());
        });
    }

    //MANEJO DE CARRITO DE COMPRAS -----------------------------------------------------------------------

    /**
     * Obtiene el carrito de compras de un cliente especifico dada su identificacion
     * @param {*} identificacion 
     * @returns 
     */
    getCarritoComprasCliente(identificacion) {
        const cliente = this.hashMapClientes.get(identificacion);
        if (cliente) {
            return cliente.getCarritoCompras();
        } else {
            alert("La identificación ingresada no existe en la tienda.")
            return null;
        }
    }

    /**
     * Agrega un producto al carrito de un cliente con su cantidad
     * @param {*} idCliente 
     * @param {*} codigoProducto 
     * @param {*} cantidadProducto 
     */
    agregarProductoCarrito(idCliente, codigoProducto, cantidadProducto) {
        const carritoCompras = this.getCarritoComprasCliente(idCliente);
        const producto = this.hashMapProductos.get(codigoProducto);
        //Revisa si el producto existe
        if (producto) {
            carritoCompras.set(producto, cantidadProducto);
            alert(`Se agregaron ${cantidadProducto} unidades de ${producto.nombre} al carrito.`)
        } else {
            alert('Codigo del producto no valido');
        }
    }

    /**
     * Elimina un producto del carrito de un cliente
     * @param {*} idCliente 
     * @param {*} codigoProducto 
     */
    eliminarProductoCarrito(idCliente, codigoProducto) {
        const carritoCompras = this.getCarritoComprasCliente(idCliente);
        const producto = this.hashMapProductos.get(codigoProducto);
        if (producto && carritoCompras.has(producto)) {
            carritoCompras.delete(producto);
            alert(`El producto ${producto.nombre} ha sido eliminado del carrito.`);
        } else {
            alert('El producto no existe en el carrito.');
        }
    }

}

