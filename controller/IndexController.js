import Tienda from "../model/Tienda.js";

document.addEventListener('DOMContentLoaded', function() {
    // Crear una instancia de la clase Tienda
    const tienda = new Tienda("TiendaJS", "Quimbaya");
    tienda.test();

    //Obtener el formulario y el botón de registrar cliente
    const formCliente = document.querySelector('.form-cliente');
    const btnRegistrarCliente = document.getElementById('subir');

    //Agregar un evento de click al botón de registrar cliente
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

