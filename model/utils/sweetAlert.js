
export function mostrarPopupError(mensaje) {
    Swal.fire({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        confirmButtonText: 'Entendido'
    });
}

export function mostrarPopupExito(mensaje) {
    Swal.fire({
        title: 'Éxito',
        text: mensaje,
        icon: 'success',
        confirmButtonText: 'Entendido'
    });
}

export function mostartPopupPrecaucion(mensaje) {
    Swal.fire({
        title: 'Precaución',
        text: mensaje,
        icon: 'warning',
        confirmButtonText: 'Entendido'
    });
}
