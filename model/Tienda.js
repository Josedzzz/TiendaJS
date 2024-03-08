import Cliente from './Cliente.js'
import Producto from './Producto.js';
import Venta from './Venta.js';
import DetalleVenta from './DetalleVenta.js';
import LinkedList from './LinkedList.js';
import * as Excepciones from './utils/Excepciones.js';
import { logError, logExito } from './utils/logger.js';




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
        this.hashMapProductos = new Map(); //Se inicializa un hashMap con new Map().  Se puede usar un objeto {} Pero Map es mas eficiente.
        this.hashMapClientes = new Map();
        this.listaVentas = []; //Se inicialzia una lista con [], es muy similar a un arraylist en Java. 
        this.historialVentas = new LinkedList();

        //Deserializar los datos al iniciar la tienda
        this.deserializarClientes(localStorage.getItem('clientes'));
        this.deserializarProductos(localStorage.getItem('productos'));
        this.deserializarVentas(localStorage.getItem('ventas'));
        this.deserializarHistorialVentas(localStorage.getItem('historial'));
    }

    getClientes() {
        return this.hashMapClientes;
    }

    getProductos() {
        return this.hashMapProductos;
    }

    getVentas() {
        return this.listaVentas;
    }

    /**
     * Funcion para serializar los clientes en formato JSON
     * @returns 
     */
    serializarClientes() {
        const clientesArray = Array.from(this.hashMapClientes.values());
        return JSON.stringify(clientesArray);
    }

    /**
     * Funcion para deserializar clientes a partir de un JSON y cargarlos en el hashMap de clientes
     * @param {*} jsonClientes 
     */
    deserializarClientes(jsonClientes) {
        if (jsonClientes) {
            const clientesArray = JSON.parse(jsonClientes);
            for (const cliente of clientesArray) {
                this.hashMapClientes.set(cliente.identificacion, new Cliente(cliente.identificacion, cliente.nombre, cliente.direccion));
            }
        }
    }

    /**
     * Funcion para serializar los productos en formato JSON
     * @returns 
     */
    serializarProductos() {
        const productosArray = Array.from(this.hashMapProductos.values());
        return JSON.stringify(productosArray);
    }

    /**
     * Funcion para deserializar productos a partir de un JSON y cargarlos en el hashMap de productos
     * @param {*} jsonProductos 
     */
    deserializarProductos(jsonProductos) {
        if (jsonProductos) {
            const productosArray = JSON.parse(jsonProductos);
            for (const producto of productosArray) {
                this.hashMapProductos.set(producto.codigo, new Producto(producto.codigo, producto.nombre, producto.precio, producto.cantidad));
            }
        }
    }

    /**
     * Funcion para serializar las ventas en formato JSON
     * @returns 
     */
    serializarVentas() {
        return JSON.stringify(this.listaVentas);
    }

    /**
     * Funcion para deserializar ventas a partir de un JSON y cargarlos en la lista de ventas
     * @param {*} jsonVentas 
     */
    deserializarVentas(jsonVentas) {
        if (jsonVentas) {
            this.listaVentas = JSON.parse(jsonVentas);
        }
    }

    /**
     * Funcion para serializar el historial de ventas en formato JSON
     * @returns 
     */
    serializarHistorialVentas() {
        const historialArray = this.historialVentas.getSalesHistory();
        return JSON.stringify(historialArray);
    }

    /**
     * Funcion para deserializar el historial de ventas a partir de un JSON y cargarlos en la linkedlist
     * @param {*} jsonHistorial 
     */
    deserializarHistorialVentas(jsonHistorial) {
        if (jsonHistorial) {
            const historialArray = JSON.parse(jsonHistorial);
            historialArray.forEach(venta => {
                this.historialVentas.insertInOrder(venta);
            });
        }
    }

    //CRUD DE CLIENTES --------------------------------------------------------------------------------

    /**
     * Test para saber que si se conecto la tienda correctamente
     */
    test() {
        alert('hello world');
    }

    /* Registra un cliente siempre verificando que la identificación no exista en el hashMap de clientes.
    Retorna true si se pudo registrar el cliente, false en caso contrario. 
    Creo que la sintáxis de la función puede mejorar pero me adapté a la forma en que se estaba haciendo :skull:- Daniel.
    * @param {*} identificacion 
    * @param {*} nombre 
    * @param {*} direccion 
    */
    registrarCliente(identificacion, nombre, direccion) {

        try {
            if (this.isCamposValidosCliente(identificacion, nombre, direccion) || !this.hashMapClientes.has(identificacion)) {

                logExito("Registro Cliente: Campos validos y no existe el cliente.")
                const cliente = new Cliente(identificacion, nombre, direccion);
                this.hashMapClientes.set(identificacion, cliente);
                this.imprimirClientes();
                //Serializo los clientes
                const clientesSerializados = this.serializarClientes();
                localStorage.setItem('clientes', clientesSerializados);
            }
            return 'exito';
        } catch (error) {
            logError(error.message);
            return error.message;
        }
    }

    /**
     * Elimina un cliente del hashMap de clientes dado su id
     * @param {*} idCliente 
     */
    eliminarCliente(idCliente) {
        // Verifica si el cliente existe en el Map. 
        //No es necesario verificar si existe o no ya que hay que elegirlo para eliminarlo, de todas maneras se deja - Daniel.
        if (this.hashMapClientes.has(idCliente)) {
            this.hashMapClientes.delete(idCliente);
            this.imprimirClientes();
            return 'exito'
            //Serializo los clientes
            const clientesSerializados = this.serializarClientes();
            localStorage.setItem('clientes', clientesSerializados);
        } else {
            throw new Excepciones.EstadoCliente(`El cliente con identificación ${idCliente} no existe.`);
        }
    }

    /**
     * Actualiza el nombre y direccion de un cliente
     * @param {*} identificacion 
     * @param {*} nuevoNombre 
     * @param {*} nuevaDireccion 
     */
    actualizarCliente(identificacion, nuevoNombre, nuevaDireccion) {
        try {
            if (this.isCamposValidosActualizacionCliente(nuevoNombre, nuevaDireccion)) {
                if (this.hashMapClientes.has(identificacion)) {
                    const cliente = this.hashMapClientes.get(identificacion);
                    cliente.setNombre(nuevoNombre);
                    cliente.setDireccion(nuevaDireccion);
                }
                return 'exito';
                //Serializo los clientes
                const clientesSerializados = this.serializarClientes();
                localStorage.setItem('clientes', clientesSerializados);
            }
        } catch (error) {
            logError(error.message);
            return error.message;
        }
    }

    /**
     * Verifica que los campos para la manipulacion de clientes no estén vacios
     * @param {*} identificacion 
     * @param {*} nombre 
     * @param {*} direccion 
     * @returns 
     */
    isCamposValidosCliente(identificacion, nombre, direccion) {

        if (this.hashMapClientes.has(identificacion)) {
            throw new Excepciones.ErrorDeValidacion('El cliente ya está registrado en la tienda.');
        }
        if (typeof +identificacion !== 'number' || identificacion < 0 || identificacion.trim() === '') {
            throw new Excepciones.ErrorDeValidacion('La identificación debe ser un número entero positivo.');
        }
        if (!/^[a-zA-Z-' ]+$/.test(nombre)) {
            throw new Excepciones.ErrorDeValidacion('El nombre solo puede contener carácteres del alfabeto y espacios.');
        }
        if (typeof direccion !== 'string' || direccion.trim() === '') {
            throw new Excepciones.ErrorDeValidacion('La dirección no puede estar vacía o debe ser una cadena de texto');
        }
        return true;
    }

    /**
     * Función para verificar los campos de texto cuando se quiere actualizar un cliente, es distinta a la de registro ya que no se verifica la identificación para evitar ambigüedades. Perdón dios.
     * @param {*} nombre 
     * @param {*} direccion 
     * @returns 
     */
    isCamposValidosActualizacionCliente(nombre, direccion) {

        let flag = true;
        if (!/^[a-zA-Z-' ]+$/.test(nombre)) {
            flag = false;
            throw new Excepciones.ErrorDeValidacion('El nombre solo puede contener carácteres del alfabeto y espacios.');
        }
        if (typeof direccion !== 'string' || direccion.trim() === '') {
            flag = false
            throw new Excepciones.ErrorDeValidacion('La dirección no puede estar vacía o debe ser una cadena de texto');
        }
        return flag;
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
        try {
            if (this.isCamposValidosProducto(codigo, nombre, precio, cantidad) || !this.hashMapProductos.has(codigo)) {
                logExito("Se registró el producto con codigo: " + codigo)
                const producto = new Producto(codigo, nombre, precio, cantidad);
                this.hashMapProductos.set(codigo, producto);
                //Imprimir el hashMap de productos para verificar si se registro correctamente
                this.imprimirProductos();
                //Serializo los productos
                const productiosSerializados = this.serializarProductos();
                localStorage.setItem('productos', productiosSerializados);
            }
            return 'exito';
        } catch (error) {
            logError(error.message);
            return error.message;
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
            return 'exito';
            const productiosSerializados = this.serializarProductos();
            localStorage.setItem('productos', productiosSerializados);
        } else {
            //alert(`Producto con código ${codigoProducto} no existe.`);
            throw new Excepciones.EstadoProducto(`Producto con código ${codigoProducto} no existe.`);
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

        try {
            if (this.isCamposValidosActualizacionProducto(nuevoNombre, nuevoPrecio, nuevaCantidad)) {
                if (this.hashMapProductos.has(codigo)) {
                    const producto = this.hashMapProductos.get(codigo);
                    producto.setNombre(nuevoNombre);
                    producto.setPrecio(nuevoPrecio);
                    producto.setCantidad(nuevaCantidad);
                    //Serializo los productos
                    const productiosSerializados = this.serializarProductos();
                    localStorage.setItem('productos', productiosSerializados);
                }
                return 'exito';
            }
        } catch (error) {
            logError(error.message);
            return error.message;
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

        if (this.hashMapProductos.has(codigo)) {
            throw new Excepciones.ErrorDeValidacion('Un producto con ese codigo ya existe.');
        }
        if (!/^[a-zA-Z-' ]+$/.test(nombre)) {
            throw new Excepciones.ErrorDeValidacion('El nombre solo puede contener carácteres del alfabeto y espacios.');
        }
        if (typeof codigo !== 'string' || codigo.trim() === '') {
            throw new Excepciones.ErrorDeValidacion('El código no puede estar vacío o debe ser una cadena de texto');
        }
        if (typeof +precio !== 'number' || precio < 0 || precio.trim() === '') {
            throw new Excepciones.ErrorDeValidacion('El precio debe ser un número positivo.');
        }
        if (typeof +cantidad !== 'number' || cantidad < 0 || cantidad.trim() === '') {
            throw new Excepciones.ErrorDeValidacion('La cantidad debe ser un número positivo.');
        }
        return true;
    }


    isCamposValidosActualizacionProducto(nombre, precio, cantidad) {
        let flag = true;
        if (!/^[a-zA-Z-' ]+$/.test(nombre)) {
            flag = false;
            throw new Excepciones.ErrorDeValidacion('El nombre solo puede contener carácteres del alfabeto y espacios.');
        }
        if (typeof +precio !== 'number' || precio < 0 || precio.trim() === '') {
            flag = false;
            throw new Excepciones.ErrorDeValidacion('El precio debe ser un número positivo.');
        }
        if (typeof +cantidad !== 'number' || cantidad < 0 || cantidad.trim() === '') {
            flag = false;
            throw new Excepciones.ErrorDeValidacion('La cantidad debe ser un número positivo.');
        }
        return flag;
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
        }
        return 'fallido';
    }

    /**
     * Agrega un producto al carrito de un cliente con su cantidad
     * @param {*} idCliente 
     * @param {*} codigoProducto 
     * @param {*} cantidadProducto 
     */
    agregarProductoCarrito(idCliente, codigoProducto, cantidadPedidaProducto) {
        let carritoCompras = this.getCarritoComprasCliente(idCliente);
        console.log(carritoCompras);

        //Operador ternario para obtener la cantidad de un producto. Si no existe, se le asigna 0.
        let cantidadProducto = (this.hashMapProductos.has(codigoProducto)) ? this.hashMapProductos.get(codigoProducto).cantidad : 0;
        console.log(cantidadProducto);
        //Se validan los campos. Tambien se revisa si el producto existe y si hay suficiente cantidad en el inventario
        try {
            this.isCamposValidosCarritoDeCompras(codigoProducto, cantidadProducto, cantidadPedidaProducto);
        } catch (error) {
            logError(error.message);
            return error.message;
        }
        let producto = this.hashMapProductos.get(codigoProducto);
        let productoAlCarrito = new Producto(producto.codigo, producto.nombre, producto.precio, cantidadPedidaProducto);
        carritoCompras.set(codigoProducto, productoAlCarrito); //Se agrega el producto al carrito, no es lo ideal pero que quede así por ahora. Quiero vivir.

        return 'exito';
    }

    /**
     * Elimina un producto del carrito de un cliente
     * @param {*} idCliente 
     * @param {*} codigoProducto 
     */
    eliminarProductoCarrito(idCliente, codigoProducto) {
        let carritoCompras = this.getCarritoComprasCliente(idCliente);
        let producto = this.hashMapProductos.get(codigoProducto);
        if (producto === null || producto === undefined || !carritoCompras.has(producto.codigo)) {
            throw new Excepciones.EstadoProducto(`El producto con código ${codigoProducto} no existe en el carrito.`);
        }
        carritoCompras.delete(producto.codigo);
        return 'exito';
    }

    isCamposValidosCarritoDeCompras(codigo, cantidadTotal, cantidadPedida) {
        if (typeof +codigo !== 'number' || codigo < 0 || codigo.trim() === '') {
            throw new Excepciones.ErrorDeValidacion('El código del producto debe ser un número positivo.');
        }
        if (!this.hashMapProductos.has(codigo)) {
            throw new Excepciones.ErrorDeValidacion('No existe un producto con ese codigo.');
        }
        if (typeof +cantidadPedida !== 'number' || cantidadPedida < 0 || cantidadPedida.trim() === '') {
            throw new Excepciones.ErrorDeValidacion('La cantidad debe ser un número positivo.');
        }
        if (+cantidadTotal < +cantidadPedida) {
            throw new Excepciones.EstadoProducto(`La cantidad solicitada excede la cantidad disponible en el inventario.`);
        }
    }

    //MANEJO DE VENTAS ---------------------------------------------------------------------------------

    /**
     * Realiza una venta en la tienda
     * @param {*} codigoVenta 
     * @param {*} idCliente 
     * @param {*} fecha 
     * @returns 
     */
    realizarVenta(codigoVenta, idCliente, fecha) {
        let cliente = this.hashMapClientes.get(idCliente);
        let carritoCompras = this.getCarritoComprasCliente(idCliente);
        try {
            if (this.isCamposValidosVenta(codigoVenta, idCliente, fecha)) {
                logExito("Venta: Campos validos");

                // Crear los detalles de la venta
                const detallesVenta = [];
                for (const [codigoProducto, cantidad] of carritoCompras) {
                    const producto = this.hashMapProductos.get(codigoProducto);
                    //console.log('precio:', producto.precio); // Log precio
                    //console.log('cantidad:', cantidad.cantidad); // Log cantidad
                    const subtotal = cantidad.cantidad * producto.precio;
                    const detalleVenta = new DetalleVenta(producto, cantidad, subtotal);
                    detallesVenta.push(detalleVenta);
                }

                // Calcular el total de la venta
                const totalVenta = detallesVenta.reduce((total, detalle) => {
                    logExito('subtotal:', detalle.subtotal); // Log subtotal
                    return total + detalle.subtotal;
                }, 0);

                // Crear la venta
                const venta = new Venta(codigoVenta, fecha, totalVenta, cliente, detallesVenta);
                logExito(venta.listaDetalles);

                // Agregar la venta a la lista de ventas de la tienda
                this.listaVentas.push(venta);

                //Agrega la venta a la linkedList (Esta la ordena sola)
                this.historialVentas.insertInOrder(venta);

                // Actualizar la cantidad de productos en el inventario
                for (const [codigoProducto, cantidad] of carritoCompras) {
                    const producto = this.hashMapProductos.get(codigoProducto);
                    console.log('producto.cantidad before:', producto.cantidad); // Log producto.cantidad before
                    console.log('cantidad:', cantidad.cantidad); // Log cantidad
                    producto.cantidad -= cantidad.cantidad;
                    console.log('producto.cantidad after:', producto.cantidad); // Log producto.cantidad after
                }
                cliente.vaciarCarrito();

                //Serializo las ventas
                const ventasSerializadas = this.serializarVentas();
                localStorage.setItem('ventas', ventasSerializadas);
                //Serializo los productos
                const productiosSerializados = this.serializarProductos();
                localStorage.setItem('productos', productiosSerializados)
                //Serializo el historial
                const historialSerializados = this.serializarHistorialVentas();
                localStorage.setItem('historial', historialSerializados);

            }
            return 'exito';
        } catch (error) {
            logError(error.message);
            return error.message;
        }
    }

    isCamposValidosVenta(codigoVenta, idCliente, fecha) {

        if (typeof +codigoVenta !== 'number' || codigoVenta < 0 || codigoVenta.trim() === '') {
            throw new Excepciones.ErrorDeValidacion('El código de venta debe ser un número positivo.');
        }
        if (this.listaVentas.some(venta => venta.codigo === codigoVenta)) {
            throw new Excepciones.ErrorDeValidacion(`El código de venta "${codigoVenta}" ya está en uso.`);
        }
        if (!this.hashMapClientes.has(idCliente)) {
            throw new Excepciones.ErrorDeValidacion(`El cliente con ID "${idCliente}" no existe.`);
        }
        if (!this.getCarritoComprasCliente(idCliente)) {
            throw new Excepciones.ErrorDeValidacion(`No se pudo obtener el carrito de compras del cliente con ID "${idCliente}".`);
        }
        if (this.getCarritoComprasCliente(idCliente).size === 0) {
            throw new Excepciones.ErrorDeValidacion(`El carrito de compras del cliente con ID "${idCliente}" está vacío.`);
        }
        if (typeof +idCliente !== 'number' || idCliente < 0 || idCliente.trim() === '') {
            throw new Excepciones.ErrorDeValidacion('La identificación del cliente debe ser un número positivo.');
        }
        if (typeof fecha !== 'string' || fecha.trim() === '') {
            throw new Excepciones.ErrorDeValidacion('Por favor seleccione una fecha');
        }
        return 'exito';
    }



    /**
     * Elimina una venta de la tienda dado si codigo
     * @param {*} codigoVenta 
     * @returns 
     */
    eliminarVenta(codigoVenta) {
        // Buscar la venta en la lista de ventas
        const ventaIndex = this.listaVentas.findIndex(venta => venta.codigo === codigoVenta);
        if (ventaIndex === -1) {
            throw new Excepciones.EstadoVenta(`No se encontró ninguna venta con el código ${codigoVenta}.`);
        }
        // Obtener la venta a eliminar
        const ventaEliminada = this.listaVentas[ventaIndex]
        // Restablecer la cantidad de productos en el inventario
        ventaEliminada.listaDetalles.forEach(detalle => {
            const producto = this.hashMapProductos.get(detalle.producto.codigo);
            producto.cantidad += detalle.cantidad.cantidad;
        });
        // Eliminar la venta de la lista de ventas
        this.listaVentas.splice(ventaIndex, 1);
        // Eliminar la venta de la linkedList de historial de ventas
        this.historialVentas.deleteVenta(codigoVenta);

        //Serializo las ventas
        const ventasSerializadas = this.serializarVentas();
        localStorage.setItem('ventas', ventasSerializadas);
        //Serializo los productos
        const productiosSerializados = this.serializarProductos();
        localStorage.setItem('productos', productiosSerializados)
        //Serializo el historial
        const historialSerializados = this.serializarHistorialVentas();
        localStorage.setItem('historial', historialSerializados);

        return 'exito';
    }

    //MANEJO DE INVENTARIO ----------------------------------------------------------------------------


    /**
     * Obtiene los productos (hashMap) y los convierte a una lista que ordena dependiendo de la cantidad
     * @returns 
     */
    obtenerProductosInventario() {
        const productosArray = Array.from(this.hashMapProductos.values());
        productosArray.sort((productoA, productoB) => {
            return productoA.cantidad - productoB.cantidad;
        });
        return productosArray;
    }

    //MANEJO DE HISTORIAL -------------------------------------------------------------------------------

    /**
     * Obtiene los detalles de venta de una venta en concreto
     * @param {*} venta 
     * @returns 
     */
    obtenerDetallesVenta(ventaCodigo) {
        const ventaEncontrada = this.listaVentas.find(venta => venta.codigo === ventaCodigo);
        if (ventaEncontrada) {
            return ventaEncontrada.listaDetalles;
        } else {
            return [];
        }
    }

}

