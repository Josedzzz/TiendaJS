import Tienda from "../model/Tienda.js";
import { logExito } from "../model/utils/logger.js";
import * as sweetAlert from "../model/utils/sweetAlert.js";

document.addEventListener('DOMContentLoaded', function () {
    // Crear una instancia de la clase Tienda
    const tienda = new Tienda("TiendaJS", "Quimbaya");
    tienda.test();

    //MANEJO DE LOS LINKS DE LA TIENDA ---------------------------------------------------------------

    const handleLinkClick = (event) => {
        event.preventDefault();
        const link = event.target;
        const formId = link.getAttribute("data-form-id");

        // Mostrar el formulario correspondiente y ocultar los demás
        const forms = document.querySelectorAll(".form-container");
        forms.forEach(form => {
            if (form.id === formId) {
                form.style.display = "block";
            } else {
                form.style.display = "none";
            }
        });

        // Ejecutar acciones específicas dependiendo del formulario
        switch (formId) {
            case 'clientesForm':
                mostrarFormulario(formId);
                mostrarClientes();
                break;
            case 'productosForm':
                mostrarFormulario(formId);
                mostrarProductos();
                break;
            case 'gestionarCarrito':
                mostrarFormulario(formId);
                const identificacionCliente = document.getElementById('identificacion-cliente-carrito').value;
                mostrarProductosCarrito(identificacionCliente);
                break;
            case 'realizarVenta':
                mostrarFormulario(formId);
                mostrarVentas();
                break;
            case 'inventario':
                mostrarFormulario(formId);
                mostrarProductosInventario();
                break;
            case 'historial':
                mostrarFormulario(formId);
                mostrarVentasHistorial();
            default:
                break;
        }
    };

    /*
    * Muestra el formulario correspondiente y oculta los demas.*/
    const mostrarFormulario = (formId) => {
        //Muestra el formulario
        const form = document.getElementById(formId);
        form.style.display = "block";
        //Oculta el resto de formularios
        const otherForms = document.querySelectorAll(".form-container:not(#" + formId + ")");
        for (const otherForm of otherForms) {
            otherForm.style.display = "none";
        }
    };

    // Asociar la funcion handleLinkClick al evento click de todos los elementos de la clase "links"
    const links = document.querySelectorAll(".links a");
    links.forEach(link => {
        link.addEventListener("click", handleLinkClick);
    });

    //MANEJO DE LA VENTANA DE CLIENTES ---------------------------------------------------------------

    //Variables auxiliares para la ventana
    const formCliente = document.querySelector('.form-cliente');
    const btnRegistrarCliente = document.getElementById('subir');
    const btnEliminarCliente = document.getElementById('btnEliminarCliente');
    const btnActualizarCliente = document.getElementById('btnActualizarCliente');
    const tablaClientes = document.getElementById('tablaClientes');
    let clienteSeleccionado = null;
    let campoIdentificacionCliente = document.getElementById('identificacion');
    let campoNombreCliente = document.getElementById('nombre');
    let campoDireccionCliente = document.getElementById('direccion');

    //Funcion para mostrar los clientes actuales de la tienda
    function mostrarClientes() {
        // Limpia la tabla antes de actualizarla
        tablaClientes.innerHTML = '';

        // Crear la tabla
        const tabla = document.createElement('table');
        tabla.classList.add('tabla-clientes');

        // Encabezado de la tabla
        const encabezados = ['Identificación', 'Nombre', 'Dirección'];
        const encabezadosRow = document.createElement('tr');
        encabezados.forEach(encabezado => {
            const th = document.createElement('th');
            th.textContent = encabezado;
            encabezadosRow.appendChild(th);
        });
        tabla.appendChild(encabezadosRow);

        // Obtener el HashMap de clientes y convertirlo en un array
        const hashMapClientes = tienda.getClientes();
        const clientesArray = Array.from(hashMapClientes.values());

        // Filas de clientes
        clientesArray.forEach(cliente => {
            const fila = document.createElement('tr');
            fila.classList.add('fila-cliente'); // Agregar clase para la fila

            const identificacionCell = document.createElement('td');
            identificacionCell.textContent = cliente.identificacion;
            fila.appendChild(identificacionCell);

            const nombreCell = document.createElement('td');
            nombreCell.textContent = cliente.nombre;
            fila.appendChild(nombreCell);

            const direccionCell = document.createElement('td');
            direccionCell.textContent = cliente.direccion;
            fila.appendChild(direccionCell);

            tabla.appendChild(fila);
        });

        // Agregar la tabla al contenedor
        tablaClientes.appendChild(tabla);
    }

    // Asociar un evento de clic a las filas de la tabla de clientes
    tablaClientes.addEventListener('click', function (event) {
        // Obtener la fila en la que se hizo clic
        const filaCliente = event.target.closest('tr');
        if (!filaCliente) return; // Salir si no se hizo clic en una fila

        // Eliminar la clase 'seleccionado' de la fila previamente seleccionada (si existe)
        const filaSeleccionada = tablaClientes.querySelector('.seleccionado');
        if (filaSeleccionada) {
            filaSeleccionada.classList.remove('seleccionado');
        }

        // Agregar la clase 'seleccionado' a la fila actual
        filaCliente.classList.add('seleccionado');

        // Actualizo clienteSeleccionado y muestro la información del cliente en el formulario, para que el usuario pueda actualizarla.
        clienteSeleccionado = filaCliente.cells[0].textContent;

        //Muestro la información del cliente en el formulario
        campoIdentificacionCliente.value = filaCliente.cells[0].textContent;
        campoNombreCliente.value = filaCliente.cells[1].textContent;
        campoDireccionCliente.value = filaCliente.cells[2].textContent;
    });

    //registrar cliente
    //Agregar un evento de click al boton de registrar cliente
    btnRegistrarCliente.addEventListener('click', function (event) {
        event.preventDefault();
        const identificacion = document.getElementById('identificacion').value;
        const nombre = document.getElementById('nombre').value;
        const direccion = document.getElementById('direccion').value;
        let resultadoRegistroCliente = registrarCliente(identificacion, nombre, direccion);

        //Limpiar los campos del formulario si hubo un registro exitoso. 
        if (resultadoRegistroCliente === 'exito') {
            sweetAlert.mostrarPopupExito('Cliente registrado exitosamente.');
            formCliente.reset();
        } else {
            sweetAlert.mostrarPopupError(resultadoRegistroCliente)
        }
    });

    /**
     * Llama a la tienda para registrar un cliente y asigna una variable bandera para verificar si se registro correctamente.
     * @param {*} identificacion 
     * @param {*} nombre 
     * @param {*} direccion 
     */
    function registrarCliente(identificacion, nombre, direccion) {
        let flag = tienda.registrarCliente(identificacion, nombre, direccion);
        //Actualizo la tabla.
        mostrarClientes();
        return flag;
    }

    //Eliminar cliente
    //Asociar un evento al boton de eliminar cliente
    btnEliminarCliente.addEventListener('click', function () {
        if (!clienteSeleccionado) {
            sweetAlert.mostartPopupPrecaucion('Por favor seleccione un cliente de la tabla para poder eliminarlo.');
            return;
        }
        const idCliente = clienteSeleccionado;
        let resultadoEliminacionCliente = eliminarCliente(idCliente);
        if (resultadoEliminacionCliente === 'exito') {
            sweetAlert.mostrarPopupExito('Cliente eliminado exitosamente.');
            clienteSeleccionado = null;
            formCliente.reset();
        } else {
            //Mostrar un mensaje de error. No llega acá por el simple hecho de que el cliente seleccionado tiene que ser seleccionado. Igual se deja por si acaso. - Daniel
            sweetAlert.mostrarPopupError(resultadoEliminacionCliente);
        }
    });

    /**
     * Llama a la tienda para eliminar un cliente dado su id    
     * @param {*} idCliente 
     */
    function eliminarCliente(idCliente) {
        let resultadoEliminacion = tienda.eliminarCliente(idCliente);
        //Actualizo la tabla
        mostrarClientes();
        return resultadoEliminacion;
    }

    //Se asocia un evento al botón para actualizar la información de un cliente a excepción de su identificación.
    btnActualizarCliente.addEventListener('click', function () {
        if (!clienteSeleccionado) {
            sweetAlert.mostartPopupPrecaucion('Por favor seleccione un cliente de la tabla para poder actualizarlo.');
            return;
        }
        const idCliente = clienteSeleccionado;
        const nuevoNombre = document.getElementById('nombre').value;
        const nuevaDireccion = document.getElementById('direccion').value;
        campoIdentificacionCliente.ariaReadOnly = true; //No se puede cambiar la identificación del cliente, igual no sirve por que deja cambiarlo jaja. - Daniel
        //campoIdentificacionCliente.value = clienteSeleccionado;
        let resultadoActualizacionCliente = actualizarCliente(idCliente, nuevoNombre, nuevaDireccion);

        if (resultadoActualizacionCliente === 'exito') {
            sweetAlert.mostrarPopupExito('Cliente actualizado exitosamente.');
            clienteSeleccionado = null;
            formCliente.reset();
        } else {
            sweetAlert.mostrarPopupError(resultadoActualizacionCliente);
        }
    });

    /**
     * Llama a la tienda para actualizar los datos de un cliente
     * @param {*} idCliente 
     * @param {*} nuevoNombre 
     * @param {*} nuevaDireccion 
     */
    function actualizarCliente(idCliente, nuevoNombre, nuevaDireccion) {
        let resultadoActualizacion = tienda.actualizarCliente(idCliente, nuevoNombre, nuevaDireccion);
        //Actualizo la tabla 
        mostrarClientes();
        return resultadoActualizacion;
    }

    //MANEJO DE LA VENTANA DE PRODUCTOS -------------------------------------------------------------

    //Variables auxiliares para la ventana
    const formProducto = document.querySelector('.form-producto');
    const btnRegistrarProducto = document.getElementById('btnRegistrarProducto');
    const btnEliminarProducto = document.getElementById('btnEliminarProducto');
    const btnActualizarProducto = document.getElementById('btnActualizarProducto');
    const tablaProductos = document.getElementById('tablaProductos');
    let productoSeleccionado = null;
    let campoNombreProducto = document.getElementById('nombre-producto');
    let campoCodigoProducto = document.getElementById('codigo-producto');
    let campoPrecioProducto = document.getElementById('precio-producto');
    let campoCantidadProducto = document.getElementById('cantidad-producto');

    //Funcion para mostrar los productos actuales de la tienda
    function mostrarProductos() {
        //Limpia la tabla de productos antes de actualizarla
        tablaProductos.innerHTML = '';

        //Crea la tabla
        const tabla = document.createElement('table');
        tabla.classList.add('tabla-productos');

        //Encabezado de la tabla
        const encabezados = ['Nombre', 'Código', 'Precio', 'Cantidad'];
        const encabezadosRow = document.createElement('tr');
        encabezados.forEach(encabezado => {
            const th = document.createElement('th');
            th.textContent = encabezado;
            encabezadosRow.appendChild(th);
        });
        tabla.appendChild(encabezadosRow);

        //Obtener el hashMap de productos y convertirlo en un array
        const hashMapProductos = tienda.getProductos();
        const productosArray = Array.from(hashMapProductos.values());

        //Filas de productos
        productosArray.forEach(producto => {
            const fila = document.createElement('tr');
            fila.classList.add('fila-producto');

            const nombreCell = document.createElement('td');
            nombreCell.textContent = producto.nombre;
            fila.appendChild(nombreCell);

            const codigoCell = document.createElement('td');
            codigoCell.textContent = producto.codigo;
            fila.appendChild(codigoCell);

            const precioCell = document.createElement('td');
            precioCell.textContent = producto.precio;
            fila.appendChild(precioCell);

            const cantidadCell = document.createElement('td');
            cantidadCell.textContent = producto.cantidad;
            fila.appendChild(cantidadCell);

            tabla.appendChild(fila);
        });

        //Agregar la tabla al contenedor
        tablaProductos.appendChild(tabla);
    }

    //Asociar un evento click a las filas de la tabla de productos
    tablaProductos.addEventListener('click', function (event) {
        //Obtener la fila en la que se hizo click
        const filaProducto = event.target.closest('tr');
        if (!filaProducto) return; //Salir si no se hizo click

        //Elimina la clase 'seleccionado' de la fila previamente seleccionada (si existe)
        const filaSeleccionada = tablaProductos.querySelector('.seleccionado');
        if (filaSeleccionada) {
            filaSeleccionada.classList.remove('seleccionado');
        }

        //Agregar la clase 'seleccionado' a la fila actual
        filaProducto.classList.add('seleccionado');

        //Actualizo productoSeleccionado
        productoSeleccionado = filaProducto.cells[1].textContent;

        campoNombreProducto.value = filaProducto.cells[0].textContent;
        campoCodigoProducto.value = filaProducto.cells[1].textContent;
        campoPrecioProducto.value = filaProducto.cells[2].textContent;
        campoCantidadProducto.value = filaProducto.cells[3].textContent;
    });

    //registrar producto
    //Agregar un evento de click al boton de registrarProducto
    btnRegistrarProducto.addEventListener('click', function (event) {
        event.preventDefault();
        const nombreProducto = document.getElementById('nombre-producto').value;
        const codigoProducto = document.getElementById('codigo-producto').value;
        const precioProducto = document.getElementById('precio-producto').value;
        const cantidadProductoRegistrado = document.getElementById('cantidad-producto').value;
        let resultadoRegistroProducto = registrarProducto(codigoProducto, nombreProducto, precioProducto, cantidadProductoRegistrado);
        //Limpia los campos del formulario
        if (resultadoRegistroProducto === 'exito') {
            sweetAlert.mostrarPopupExito('Producto registrado exitosamente.');
            formProducto.reset();
        } else {
            sweetAlert.mostrarPopupError(resultadoRegistroProducto)
        }
    });

    /**
     * Llama a la tienda para registrar un nuevo producto
     * @param {*} codigo 
     * @param {*} nombre 
     * @param {*} precio 
     * @param {*} cantidad 
     */
    function registrarProducto(codigo, nombre, precio, cantidad) {
        let flag = tienda.registrarProducto(codigo, nombre, precio, cantidad);
        //Actualizo la tabla
        mostrarProductos();
        return flag;
    }

    //Eliminar producto
    //Asociar un evento al boton de eliminar producto
    btnEliminarProducto.addEventListener('click', function () {
        if (!productoSeleccionado) {
            sweetAlert.mostartPopupPrecaucion('Por favor seleccione un producto de la tabla para poder eliminarlo.');
            return;
        }
        const codigoProducto = productoSeleccionado;
        let resultadoEliminacionProducto = eliminarProducto(codigoProducto);
        if (resultadoEliminacionProducto === 'exito') {
            sweetAlert.mostrarPopupExito('Producto eliminado exitosamente.');
            productoSeleccionado = null;
            formProducto.reset();
        } else {
            //De nuevo, nunca llega aca pero lo dejo por si acaso. - Daniel
            sweetAlert.mostrarPopupError(resultadoEliminacionProducto);
        }
    });

    /**
     * Llama a la tienda para eliminar un producto dado su codigo. Girl thats bad for us.
     * @param {*} codigoProducto 
     */
    function eliminarProducto(codigoProducto) {
        let resultadoEliminacion = tienda.eliminarProducto(codigoProducto);
        //Actualizo la tabla
        mostrarProductos();
        return resultadoEliminacion;
    }

    //Asociar un evento al boton de de actualizar producto
    btnActualizarProducto.addEventListener('click', function () {
        if (!productoSeleccionado) {
            sweetAlert.mostartPopupPrecaucion('Por favor seleccione un producto de la tabla para poder actualizarlo.');
            return;
        }
        const codigoProducto = productoSeleccionado;
        const nombreProducto = document.getElementById('nombre-producto').value;
        const precioProducto = document.getElementById('precio-producto').value;
        const cantidadProductoActualizado = document.getElementById('cantidad-producto').value;
        let resultadoActualizacionProducto = actualizarProducto(codigoProducto, nombreProducto, precioProducto, cantidadProductoActualizado);

        if (resultadoActualizacionProducto === 'exito') {
            sweetAlert.mostrarPopupExito('Producto actualizado exitosamente.');
            productoSeleccionado = null;
            formProducto.reset();
        } else {
            sweetAlert.mostrarPopupError(resultadoActualizacionProducto);
        }
    });

    /**
     * Llama a la tienda para actualizar los datos de un producto
     * @param {*} codigo 
     * @param {*} nuevoNombre 
     * @param {*} nuevoPrecio 
     * @param {*} nuevaCantidad 
     */
    function actualizarProducto(codigo, nuevoNombre, nuevoPrecio, nuevaCantidad) {
        let resultadoActualizacion = tienda.actualizarProducto(codigo, nuevoNombre, nuevoPrecio, nuevaCantidad);
        //Actualizo la tabla
        mostrarProductos();
        return resultadoActualizacion;
    }

    //MANEJO DE LA VENTANA DE CARRITO -------------------------------------------------------------------

    //Variables auxiliares para la ventana 
    const formCarrito = document.querySelector('.form-carrito');
    const btnMostrarCarritoCliente = document.getElementById('btnMostrarCarritoCliente');
    const btnAgregarProductoCarrito = document.getElementById('btnAgregarProductoCarrito');
    const btnEliminarProductoCarrito = document.getElementById('btnEliminarProductoCarrito');
    const tablaProductosCarrito = document.getElementById('tablaProductosCarrito');
    let productoCarritoSeleccionado = null;

    //Funcion para mostrar los productos actuales en el carrito del cliente
    function mostrarProductosCarrito(identificacionCliente) {
        if (identificacionCliente === null) {
            //No new popup for you
            sweetAlert.mostartPopupPrecaucion('El identificador del cliente es nulo');
            return;
        }
        //Limpia el carrito antes de actualizarlo
        tablaProductosCarrito.innerHTML = '';

        //Crea la tabla
        const tabla = document.createElement('table');
        tabla.classList.add('tabla-productos-carrito');

        //Encabezado de la lista
        const encabezados = ["Código", "Nombre", "Precio", "Cantidad"];
        const encabezadosRow = document.createElement('tr');
        encabezados.forEach(encabezado => {
            const th = document.createElement('th');
            th.textContent = encabezado;
            encabezadosRow.appendChild(th);
        });
        tabla.appendChild(encabezadosRow);

        //Obtener el hashMap de carrito de un cliente
        const carritoCompras = tienda.getCarritoComprasCliente(identificacionCliente);
        if (carritoCompras === 'fallido') {
            sweetAlert.mostrarPopupError('El cliente no cuenta con un carrito de compras.');
            return;
        }

        //Add productos a la tabla con sus cantidades
        carritoCompras.forEach((valorActual, idCliente, producto) => {

            const fila = document.createElement('tr');
            fila.classList.add('fila-producto-carrito');

            const codigoCell = document.createElement('td');
            codigoCell.textContent = valorActual.codigo;
            fila.appendChild(codigoCell);

            const nombreCell = document.createElement('td');    
            nombreCell.textContent = valorActual.nombre;
            fila.appendChild(nombreCell);

            const precioCell = document.createElement('td');
            precioCell.textContent = valorActual.precio;
            fila.appendChild(precioCell);

            const cantidadCell = document.createElement('td');
            cantidadCell.textContent = valorActual.cantidad;
            fila.appendChild(cantidadCell);

            tabla.appendChild(fila);
        });

        //Agregar la tabla al contenedor
        tablaProductosCarrito.appendChild(tabla);
    }

    //Asociar un evento click a las filas de la tabla de productos
    tablaProductosCarrito.addEventListener('click', function (event) {
        //Obtener la fila en la que se hizo click
        const filaProducto = event.target.closest('tr');
        if (!filaProducto) return;
        //Elimina la clase 'seleccionado' de la fila previamente seleccionada (si existe)
        const filaSeleccionada = tablaProductosCarrito.querySelector('.seleccionado');
        if (filaSeleccionada) {
            filaSeleccionada.classList.remove('seleccionado');
        }
        //Agregar la clase 'seleccionado' a la fila actual
        filaProducto.classList.add('seleccionado');

        //Actualizo el productoSeleccionado
        productoCarritoSeleccionado = filaProducto.cells[0].textContent;
        logExito("Producto del carrito seleccionado: " + productoCarritoSeleccionado);
    });

    //Agregar un evento de click al boton de agregarProducto al carrito
    btnAgregarProductoCarrito.addEventListener('click', function (event) {
        event.preventDefault();
        const idCliente = document.getElementById('identificacion-cliente-carrito').value;
        const codigoProducto = document.getElementById('codigo-producto-carrito').value;
        const cantidadProductoParaCarrito = document.getElementById('cantidad-producto-carrito').value;
        let resultadoAgregarProductoAlCarrito = agregarProductoCarrito(idCliente, codigoProducto, cantidadProductoParaCarrito);

        if (resultadoAgregarProductoAlCarrito === 'exito') {
            sweetAlert.mostrarPopupExito('Producto agregado al carrito exitosamente.');
            formCarrito.reset();
            document.getElementById('identificacion-cliente-carrito').value = idCliente;
        } else {
            sweetAlert.mostrarPopupError('Producto no agregado al carrito: ' + resultadoAgregarProductoAlCarrito);
        }
        //Limpio los campos del formulario excepto el id del cliente

    });

    /**
     * Llama a la tienda para registrar un producto en el carrito de un cliente
     * @param {*} idCliente 
     * @param {*} codigoProducto 
     * @param {*} cantidadProductoParaCarrito 
     */
    function agregarProductoCarrito(idCliente, codigoProducto, cantidadProductoParaCarrito) {

        let resultadoAgregacion = '';
        try {
            resultadoAgregacion = tienda.agregarProductoCarrito(idCliente, codigoProducto, cantidadProductoParaCarrito);
            mostrarProductosCarrito(idCliente);
        } catch (error) {
            resultadoAgregacion = error.message;
        }
        //Actualizo la tabla del carrito
        return resultadoAgregacion;
    }

    //Asociar un evento al boton de eliminar producto del carrito
    btnEliminarProductoCarrito.addEventListener('click', function () {
        if (!productoCarritoSeleccionado) {
            sweetAlert.mostartPopupPrecaucion('Por favor seleccione un producto del carrito para poder eliminarlo.');
            return;
        }
        const identificacionCliente = document.getElementById('identificacion-cliente-carrito').value;
        const codigoProducto = productoCarritoSeleccionado;
        let resultadoEliminarProductoCarrito = eliminarProductoCarrito(identificacionCliente, codigoProducto);
        if(resultadoEliminarProductoCarrito === 'exito'){
            sweetAlert.mostrarPopupExito('Producto eliminado del carrito exitosamente.');
        } else {
            sweetAlert.mostrarPopupError('Producto no eliminado del carrito: ' + resultadoEliminarProductoCarrito);
        }
        productoCarritoSeleccionado = null;
    });

    /**
     * Llama a la tienda para eliminar el producto de un carrito de un cliente
     * @param {*} idCliente 
     * @param {*} codigoProducto 
     */
    function eliminarProductoCarrito(idCliente, codigoProducto) {
        let resultadoEliminarProductoCarrito = '';
        try {
            resultadoEliminarProductoCarrito = tienda.eliminarProductoCarrito(idCliente, codigoProducto);
            //Se actualiza la tabla del carrito.
            mostrarProductosCarrito(idCliente);
        } catch (error) {
            resultadoEliminarProductoCarrito = error.message;
        }
        return resultadoEliminarProductoCarrito;
    }

    //Asocia un evento al boton de mostrar el carrito de un cliente
    btnMostrarCarritoCliente.addEventListener('click', function (event) {
        event.preventDefault();
        const identificacionCliente = document.getElementById('identificacion-cliente-carrito').value;
        mostrarProductosCarrito(identificacionCliente);
        sweetAlert.mostrarPopupExito('Carrito del cliente mostrado exitosamente.');
    });

    //MANEJO DE LA VENTANA DE VENTA -----------------------------------------------------------------------

    const formVenta = document.querySelector('.form-venta');
    const btnAgregarVenta = document.getElementById('btnAgregarVenta');
    const btnEliminarVenta = document.getElementById('btnEliminarVenta');
    const tablaVentas = document.getElementById('tablaVentas');
    let ventaSeleccionada = null;

    //Funcion para mostrar las ventas actuales de la tienda
    function mostrarVentas() {
        //Limpia las ventas antes de actualizarlas
        tablaVentas.innerHTML = '';

        //Crea la tabla
        const tabla = document.createElement('table');
        tabla.classList.add('tabla-ventas');

        //Encabezado de la lista
        const encabezados = ["Código", "Fecha", "Total", "Cliente"];
        const encabezadosRow = document.createElement('tr');
        encabezados.forEach(encabezado => {
            const th = document.createElement('th');
            th.textContent = encabezado;
            encabezadosRow.appendChild(th);
        });
        tabla.appendChild(encabezadosRow);

        //Obtener la lista de ventas de la tienda
        const listaVentas = tienda.getVentas();

        //Add ventas a la tabla
        listaVentas.forEach(venta => {
            const fila = document.createElement('tr');
            fila.classList.add('fila-venta');

            const codigoCell = document.createElement('td');
            codigoCell.textContent = venta.codigo;
            fila.appendChild(codigoCell);

            const fechaCell = document.createElement('td');
            fechaCell.textContent = venta.fecha;
            fila.appendChild(fechaCell);

            const totalCell = document.createElement('td');
            totalCell.textContent = venta.total;
            fila.appendChild(totalCell);

            const idClienteCell = document.createElement('td');
            idClienteCell.textContent = venta.cliente.identificacion;
            fila.appendChild(idClienteCell);

            tabla.appendChild(fila);
        });

        //Agregar la tabla al contenedor
        tablaVentas.appendChild(tabla);
    }

    //Asociar un evento click a las filas de la tabla de ventas
    tablaVentas.addEventListener('click', function (event) {
        //Obtener la fila en la que se hizo click
        const filaVenta = event.target.closest('tr');
        if (!filaVenta) return;

        //Elimina la clase 'seleccionado' de la fila previamente seleccionada (si existe)
        const filaSeleccionada = tablaVentas.querySelector('.seleccionado');
        if (filaSeleccionada) {
            filaSeleccionada.classList.remove('seleccionado');
        }

        //Agregar la clase 'seleccionado' a la fila actual
        filaVenta.classList.add('seleccionado');

        //Actualizo la venta seleccionada
        ventaSeleccionada = filaVenta.cells[0].textContent;
        console.log("Venta seleccionada " + ventaSeleccionada);
    });

    //Agregar un evento de click al boton de registrar venta
    btnAgregarVenta.addEventListener('click', function (event) {
        event.preventDefault();
        const codigoVenta = document.getElementById('codigo-venta').value;
        const idClienteVenta = document.getElementById('cliente-venta').value;
        const fechaVenta = document.getElementById('fecha-venta').value;
        let resultadoRegistroVenta = registrarVenta(codigoVenta, idClienteVenta, fechaVenta);
        //Limpia los campos del formulario
        if(resultadoRegistroVenta === 'exito'){
            sweetAlert.mostrarPopupExito('Venta registrada exitosamente.');
            formVenta.reset();
        } else {    
            sweetAlert.mostrarPopupError('No se puedo realizar la venta: ' + resultadoRegistroVenta);
        }
    });

    /**
     * Llama a la tienda para realizar una venta
     * @param {*} codigoVenta 
     * @param {*} idClienteVenta 
     * @param {*} fechaVenta 
     */
    function registrarVenta(codigoVenta, idClienteVenta, fechaVenta) {
        let resultado = tienda.realizarVenta(codigoVenta, idClienteVenta, fechaVenta);
        //Actualizo la tabla de ventas
        mostrarVentas();
        return resultado;
    }

    //Agrega un evento de click al boton de eliminar venta
    btnEliminarVenta.addEventListener('click', function () {
        if (!ventaSeleccionada) {
            sweetAlert.mostartPopupPrecaucion('Por favor seleccione una venta de la tabla para poder eliminarla.');
            return;
        }
        const codigoVenta = ventaSeleccionada;
        let resultadoEliminacionVenta = eliminarVenta(codigoVenta);
        if(resultadoEliminacionVenta === 'exito'){
            sweetAlert.mostrarPopupExito('Venta eliminada exitosamente.');
            ventaSeleccionada = null;
        } else {
            //No creo que llegue nunca aca el codigo ya que la venta tiene que ser seleccionada, pero, igual lo dejo por si acaso. - Daniel
            sweetAlert.mostrarPopupError('No se pudo eliminar la venta: ' + resultadoEliminacionVenta);
        }
    });

    /**
     * Llama a la tienda para eliminar una venta dado si codigo
     * @param {*} codigoVenta 
     */
    function eliminarVenta(codigoVenta) {
        let resultado = tienda.eliminarVenta(codigoVenta);
        //Actualizo la tabla
        mostrarVentas();
        return resultado;
    }

    //MANEJO DE INVENTARIO ----------------------------------------------------------------------------

    const tablaProductosInventario = document.getElementById('tablaProductosInventario');

    //Muestra los productos del inventario de la tienda
    function mostrarProductosInventario() {
        //Limpia la tabla de productos antes de actualizarla
        tablaProductosInventario.innerHTML = '';

        //Crea la tabla
        const tabla = document.createElement('table');
        tabla.classList.add('tabla-productos-inventario');

        //Encabezado de la tabla
        const encabezados = ['Nombre', 'Código', 'Precio', 'Cantidad'];
        const encabezadosRow = document.createElement('tr');
        encabezados.forEach(encabezado => {
            const th = document.createElement('th');
            th.textContent = encabezado;
            encabezadosRow.appendChild(th);
        });
        tabla.appendChild(encabezadosRow);

        //Obtener el array ordenado del inventario de la tienda
        const productosArray = tienda.obtenerProductosInventario();

        //Filas de productos
        productosArray.forEach(producto => {
            const fila = document.createElement('tr');
            fila.classList.add('fila-producto-inventario');

            const nombreCell = document.createElement('td');
            nombreCell.textContent = producto.nombre;
            fila.appendChild(nombreCell);

            const codigoCell = document.createElement('td');
            codigoCell.textContent = producto.codigo;
            fila.appendChild(codigoCell);

            const precioCell = document.createElement('td');
            precioCell.textContent = producto.precio;
            fila.appendChild(precioCell);

            const cantidadCell = document.createElement('td');
            cantidadCell.textContent = producto.cantidad;
            fila.appendChild(cantidadCell);

            tabla.appendChild(fila);
        });

        //Agregar la tabla al contenedor
        tablaProductosInventario.appendChild(tabla);
    }

    //MANEJO DEL HISTORIAL ------------------------------------------------------------------------------

    const tablaVentasHistorial = document.getElementById('tablaVentasHistorial');

    //Muestra el historial de ventas de la tienda
    function mostrarVentasHistorial() {
        //Limpia la tabla de productos antes de actualizarla
        tablaVentasHistorial.innerHTML = '';

        //Crea la tabla
        const tabla = document.createElement('table');
        tabla.classList.add('tabla-ventas-historial');

        //Encabezado de la lista
        const encabezados = ["Código", "Fecha", "Total", "Cliente"];
        const encabezadosRow = document.createElement('tr');
        encabezados.forEach(encabezado => {
            const th = document.createElement('th');
            th.textContent = encabezado;
            encabezadosRow.appendChild(th);
        });
        tabla.appendChild(encabezadosRow);

        //Obtener la linkedList ya ordenada de la tienda
        const ventasHistorialArray = tienda.historialVentas.getSalesHistory();

        //Filas de productos 
        ventasHistorialArray.forEach(venta => {
            const fila = document.createElement('tr');
            fila.classList.add('fila-venta-historial');

            const codigoCell = document.createElement('td');
            codigoCell.textContent = venta.codigo;
            fila.appendChild(codigoCell);

            const fechaCell = document.createElement('td');
            fechaCell.textContent = venta.fecha;
            fila.appendChild(fechaCell);

            const totalCell = document.createElement('td');
            totalCell.textContent = venta.total;
            fila.appendChild(totalCell);

            const idClienteCell = document.createElement('td');
            idClienteCell.textContent = venta.cliente.identificacion;
            fila.appendChild(idClienteCell);

            tabla.appendChild(fila);
        });

        //Agregar la tabla al contenedor
        tablaVentasHistorial.appendChild(tabla);
    }

});


