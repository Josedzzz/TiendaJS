import Tienda from "../model/Tienda.js";

document.addEventListener('DOMContentLoaded', function() {
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
            default:
                break;
        }
    };

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
    tablaClientes.addEventListener('click', function(event) {
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

        // Actualizo clienteSeleccionado
        clienteSeleccionado = filaCliente.cells[0].textContent;
    });
    

    //Agregar un evento de click al boton de registrar cliente
    btnRegistrarCliente.addEventListener('click', function(event) {
        event.preventDefault(); 
        const identificacion = document.getElementById('identificacion').value;
        const nombre = document.getElementById('nombre').value;
        const direccion = document.getElementById('direccion').value;
        registrarCliente(identificacion, nombre, direccion);
        //Limpiar los campos del formulario (opcional)
        formCliente.reset();
    });
    
    /**
     * Llama a la tienda para registrar un cliente
     * @param {*} identificacion 
     * @param {*} nombre 
     * @param {*} direccion 
     */
    function registrarCliente(identificacion, nombre, direccion) {
        tienda.registrarCliente(identificacion, nombre, direccion);
        //Actualizo la tabla
        mostrarClientes();
    }

    //Asociar un evento al boton de eliminar cliente
    btnEliminarCliente.addEventListener('click', function() {
        if (!clienteSeleccionado) {
            alert('Por favor selecciona un cliente en la tabla.');
            return;
        }
        const idCliente = clienteSeleccionado;
        eliminarCliente(idCliente);
        clienteSeleccionado = null;
    });

    /**
     * Llama a la tienda para eliminar un cliente dado su id    
     * @param {*} idCliente 
     */
    function eliminarCliente(idCliente) {
        tienda.eliminarCliente(idCliente);
        //Actualizo la tabla
        mostrarClientes();
    }

    //Se asocia un evento al boton de actualizar cliente
    btnActualizarCliente.addEventListener('click', function() {
        if (!clienteSeleccionado) {
            alert('Por favor seleccione un cliente en la tabla.');
            return;
        }
        const idCliente = clienteSeleccionado;
        const nuevoNombre = document.getElementById('nombre').value;
        const nuevaDireccion = document.getElementById('direccion').value;
        actualizarCliente(idCliente, nuevoNombre, nuevaDireccion);
        formCliente.reset();
    });

    /**
     * Llama a la tienda para actualizar los datos de un cliente
     * @param {*} idCliente 
     * @param {*} nuevoNombre 
     * @param {*} nuevaDireccion 
     */
    function actualizarCliente(idCliente, nuevoNombre, nuevaDireccion) {
        tienda.actualizarCliente(idCliente, nuevoNombre, nuevaDireccion);
        //Actualizo la tabla 
        mostrarClientes();
    }

    //MANEJO DE LA VENTANA DE PRODUCTOS -------------------------------------------------------------

    //Variables auxiliares para la ventana
    const formProducto = document.querySelector('.form-producto');
    const btnRegistrarProducto = document.getElementById('btnRegistrarProducto');
    const btnEliminarProducto = document.getElementById('btnEliminarProducto');
    const btnActualizarProducto = document.getElementById('btnActualizarProducto');
    const tablaProductos = document.getElementById('tablaProductos');
    let productoSeleccionado = null;

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
    tablaProductos.addEventListener('click', function(event) {
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
        console.log("Producto seleccionado: " + productoSeleccionado);
    });

    //Agregar un evento de click al boton de registrarProducto
    btnRegistrarProducto.addEventListener('click', function(event) {
        event.preventDefault();
        const nombreProducto = document.getElementById('nombre-producto').value;
        const codigoProducto = document.getElementById('codigo-producto').value;
        const precioProducto = document.getElementById('precio-producto').value;
        const cantidadProducto = document.getElementById('cantidad-producto').value;
        registrarProducto(codigoProducto, nombreProducto, precioProducto, cantidadProducto);
        //Limpia los campos del formulario
        formProducto.reset();
    });

    /**
     * Llama a la tienda para registrar un nuevo producto
     * @param {*} codigo 
     * @param {*} nombre 
     * @param {*} precio 
     * @param {*} cantidad 
     */
    function registrarProducto(codigo, nombre, precio, cantidad) {
        tienda.registrarProducto(codigo, nombre, precio, cantidad);
        //Actualizo la tabla
        mostrarProductos();
    }

    //Asociar un evento al boton de eliminar producto
    btnEliminarProducto.addEventListener('click', function() {
        if (!productoSeleccionado) {
            alert("Por favor seleccione un producto en la tabla.");
            return;
        }
        const codigoProducto = productoSeleccionado;
        eliminarProducto(codigoProducto);
        productoSeleccionado = null;
    });

    /**
     * Llama a la tienda para eliminar un producto dado su codigo
     * @param {*} codigoProducto 
     */
    function eliminarProducto(codigoProducto) {
        tienda.eliminarProducto(codigoProducto);
        //Actualizo la tabla
        mostrarProductos();
    }

    //Asociar un evento al boton de de actualizar producto
    btnActualizarProducto.addEventListener('click', function() {
        if (!productoSeleccionado) {
            alert("Por favor seleccione un producto en la tabla.");
            return;
        }
        const codigoProducto = productoSeleccionado;
        const nombreProducto = document.getElementById('nombre-producto').value;
        const precioProducto = document.getElementById('precio-producto').value;
        const cantidadProducto = document.getElementById('cantidad-producto').value;
        actualizarProducto(codigoProducto, nombreProducto, precioProducto, cantidadProducto);
        formProducto.reset();
    });

    /**
     * Llama a la tienda para actualizar los datos de un producto
     * @param {*} codigo 
     * @param {*} nuevoNombre 
     * @param {*} nuevoPrecio 
     * @param {*} nuevaCantidad 
     */
    function actualizarProducto(codigo, nuevoNombre, nuevoPrecio, nuevaCantidad) {
        tienda.actualizarProducto(codigo, nuevoNombre, nuevoPrecio, nuevaCantidad);
        //Actualizo la tabla
        mostrarProductos();
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
            alert('El identificador del cliente es nulo');
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
        if (carritoCompras === null) {
            return;
        }
        
        //Add productos a la tabla con sus cantidades
        carritoCompras.forEach((cantidad, producto) => {
            const fila = document.createElement('tr');
            fila.classList.add('fila-producto-carrito');
        
            const codigoCell = document.createElement('td');
            codigoCell.textContent = producto.codigo;
            fila.appendChild(codigoCell);
        
            const nombreCell = document.createElement('td');
            nombreCell.textContent = producto.nombre;
            fila.appendChild(nombreCell);
        
            const precioCell = document.createElement('td');
            precioCell.textContent = producto.precio;
            fila.appendChild(precioCell);
        
            const cantidadCell = document.createElement('td');
            cantidadCell.textContent = cantidad;
            fila.appendChild(cantidadCell);
        
            tabla.appendChild(fila);
        });

        //Agregar la tabla al contenedor
        tablaProductosCarrito.appendChild(tabla);
    }

    //Asociar un evento click a las filas de la tabla de productos
    tablaProductosCarrito.addEventListener('click', function(event) {
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
        console.log("Producto carrito seleccionado: " + productoCarritoSeleccionado);
    });

    //Agregar un evento de click al boton de agregarProducto
    btnAgregarProductoCarrito.addEventListener('click', function(event) {
        event.preventDefault();
        const idCliente = document.getElementById('identificacion-cliente-carrito').value;
        const codigoProducto = document.getElementById('codigo-producto-carrito').value;
        const cantidadProducto = document.getElementById('cantidad-producto-carrito').value;
        agregarProductoCarrito(idCliente, codigoProducto, cantidadProducto);
        //Limpio los campos del formulario excepto el id del cliente
        formCarrito.reset();
        document.getElementById('identificacion-cliente-carrito').value = idCliente;
    });

    /**
     * Llama a la tienda para registrar un producto en el carrito de un cliente
     * @param {*} idCliente 
     * @param {*} codigoProducto 
     * @param {*} cantidadProducto 
     */
    function agregarProductoCarrito(idCliente, codigoProducto, cantidadProducto) {
        tienda.agregarProductoCarrito(idCliente, codigoProducto, cantidadProducto);
        //Actualizo la tabla del carrito
        mostrarProductosCarrito(idCliente);
    }

    //Asociar un evento al boton de eliminar producto del carrito
    btnEliminarProductoCarrito.addEventListener('click', function() {
        if (!productoCarritoSeleccionado) {
            alert("Por favor seleccione un producto en la tabla.");
            return;
        }
        const identificacionCliente = document.getElementById('identificacion-cliente-carrito').value; 
        const codigoProducto = productoCarritoSeleccionado;
        eliminarProductoCarrito(identificacionCliente, codigoProducto);
        productoCarritoSeleccionado = null;
    });

    /**
     * Llama a la tienda para eliminar el producto de un carrito de un cliente
     * @param {*} idCliente 
     * @param {*} codigoProducto 
     */
    function eliminarProductoCarrito(idCliente, codigoProducto) {
        tienda.eliminarProductoCarrito(idCliente, codigoProducto);
        //Actualizo la tabla
        mostrarProductosCarrito(idCliente);
    }

    //Asocia un evento al boton de mostrar el carrito de un cliente
    btnMostrarCarritoCliente.addEventListener('click', function(event) {
        event.preventDefault();
        const identificacionCliente = document.getElementById('identificacion-cliente-carrito').value; 
        mostrarProductosCarrito(identificacionCliente);
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
    tablaVentas.addEventListener('click', function(event) {
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
    btnAgregarVenta.addEventListener('click', function(event) {
        event.preventDefault();
        const codigoVenta = document.getElementById('codigo-venta').value;
        const idClienteVenta = document.getElementById('cliente-venta').value;
        const fechaVenta = document.getElementById('fecha-venta').value;
        registrarVenta(codigoVenta, idClienteVenta, fechaVenta);
        //Limpia los campos del formulario
        formVenta.reset();  
    });

    /**
     * Llama a la tienda para realizar una venta
     * @param {*} codigoVenta 
     * @param {*} idClienteVenta 
     * @param {*} fechaVenta 
     */
    function registrarVenta(codigoVenta, idClienteVenta, fechaVenta) {
        tienda.realizarVenta(codigoVenta, idClienteVenta, fechaVenta);
        //Actualizo la tabla de ventas
        mostrarVentas();
    }

    //Agrega un evento de click al boton de eliminar venta
    btnEliminarVenta.addEventListener('click', function() {
        if (!ventaSeleccionada) {
            alert("Por favor seleccione una venta en la tabla.");
            return;
        }
        const codigoVenta = ventaSeleccionada;
        eliminarVenta(codigoVenta);
        ventaSeleccionada = null;
    });

    /**
     * Llama a la tienda para eliminar una venta dado si codigo
     * @param {*} codigoVenta 
     */
    function eliminarVenta(codigoVenta) {
        tienda.eliminarVenta(codigoVenta);
        //Actualizo la tabla
        mostrarVentas();
    }

    //MANEJO DE INVENTARIO ----------------------------------------------------------------------------

    const tablaProductosInventario = document.getElementById('tablaProductosInventario');

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

});

//Manejo de los links de la app para el cambio de contenido

/**
 * Controla el click que hace el usuario
 * @param {*} event representa el evento click cuando el usuario hace click en el enlace 
 */
/*const handleLinkClick = (event) => {
  	const link = event.target;
  	//Id del formulario que se va a mostrar
  	const formId = link.getAttribute("data-form-id"); 
  	mostrarFormulario(formId);
}*/

/**
 * Muestra el formulario al que se le da click desde el header
 * @param {*} formId 
 */
/*const mostrarFormulario = (formId) => {
    //Muestra el formulario
    const form = document.getElementById(formId);
    form.style.display = "block";
    //Oculta el resto de formularios
    const otherForms = document.querySelectorAll(".form-container:not(#" + formId + ")");
    for (const otherForm of otherForms) {
        otherForm.style.display = "none";
    }
};*/

//Asociar la funcion handleLinkClick al evento click de todos los elementos de la clase "links"
/*const links = document.querySelectorAll(".links a");
for (const link of links) {
  	link.addEventListener("click", handleLinkClick);
}*/

