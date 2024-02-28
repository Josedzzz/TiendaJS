import Tienda from "../model/Tienda.js";

document.addEventListener('DOMContentLoaded', function() {
    // Crear una instancia de la clase Tienda
    const tienda = new Tienda("TiendaJS", "Quimbaya");
    tienda.test();

    //Obtener el formulario y el boton de registrar cliente
    const formCliente = document.querySelector('.form-cliente');
    const btnRegistrarCliente = document.getElementById('subir');

    //Agregar un evento de click al boton de registrar cliente
    btnRegistrarCliente.addEventListener('click', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe

        //Obtener los valores de los campos del formulario
        const identificacion = document.getElementById('identificacion').value;
        const nombre = document.getElementById('nombre').value;
        const direccion = document.getElementById('direccion').value;

        //Llamar al método registrarCliente de la clase Tienda
        tienda.registrarCliente(identificacion, nombre, direccion);
        mostrarClientes();
        //Limpiar los campos del formulario (opcional)
        formCliente.reset();
    });

    //Manejo de la tabla de clientes de la app
    const tablaClientes = document.getElementById('tablaClientes');

    function mostrarClientes() {
        // Limpia la tabla antes de actualizarla
        tablaClientes.innerHTML = '';
    
        // Crear la tabla
        const tabla = document.createElement('table');
        tabla.classList.add('tabla-clientes'); // Agregar clase para la tabla
    
        // Encabezado de la tabla
        const encabezados = ['Identificación', 'Nombre', 'Dirección'];
        const encabezadosRow = document.createElement('tr');
        encabezados.forEach(encabezado => {
            const th = document.createElement('th');
            th.textContent = encabezado;
            encabezadosRow.appendChild(th);
        });
        tabla.appendChild(encabezadosRow);
    
        // Obtener el HashMap de clientes utilizando el método getClientes()
        const hashMapClientes = tienda.getClientes();
    
        // Convertir el HashMap a un array
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

    //Eliminar cliente dado un cliente seleccionado en la tabla
    const btnEliminarCliente = document.getElementById('btnEliminarCliente');
    let clienteSeleccionado = null;

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

        // Actualizar la variable clienteSeleccionado con la fila seleccionada
        clienteSeleccionado = filaCliente.cells[0].textContent;
    });


    // Asociar un evento al botón eliminar cliente
    btnEliminarCliente.addEventListener('click', function() {
        if (!clienteSeleccionado) {
            // Si no se ha seleccionado ningún cliente, mostrar un mensaje de alerta
            alert('Por favor selecciona un cliente en la tabla.');
            return;
        }

        //Obtiene el id del cliente seleccionado
        const idCliente = clienteSeleccionado;
        //Llama a la funcion eliminar cliente y limpia la seleccion
        eliminarCliente(idCliente);
        // Eliminar la clase 'seleccionado' de la fila de la tabla seleccionada
        const filaSeleccionada = tablaClientes.querySelector('.seleccionado');
        if (filaSeleccionada) {
            filaSeleccionada.classList.remove('seleccionado');
        }
        // Limpiar la selección
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

    //Obtener el boton para actualizar cliente
    const btnActualizarCliente = document.getElementById('btnActualizarCliente');

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

});

//Manejo de los links de la app para el cambio de contenido

/**
 * Controla el click que hace el usuario
 * @param {*} event representa el evento click cuando el usuario hace click en el enlace 
 */
const handleLinkClick = (event) => {
  	const link = event.target;
  	//Id del formulario que se va a mostrar
  	const formId = link.getAttribute("data-form-id"); 
  	mostrarFormulario(formId);
}

/**
 * Muestra el formulario al que se le da click desde el header
 * @param {*} formId 
 */
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

//Asociar la funcion handleLinkClick al evento click de todos los elementos de la clase "links"
const links = document.querySelectorAll(".links a");
for (const link of links) {
  	link.addEventListener("click", handleLinkClick);
}

