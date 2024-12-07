const AlertManager = {
    showSuccess(message = 'Operación completada exitosamente.') {
        Swal.fire({
            title: 'Éxito',
            text: message,
            icon: 'success',
            confirmButtonText: 'OK',
        });
    },

    showError(message = 'Ocurrió un error inesperado.') {
        Swal.fire({
            title: 'Error',
            text: message,
            icon: 'error',
            confirmButtonText: 'OK',
        });
    },

    showWarning(message = '¿Estás seguro de continuar?', confirmCallback) {
        Swal.fire({
            title: 'Advertencia',
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed && typeof confirmCallback === 'function') {
                confirmCallback();
            }
        });
    },

    showInfo(message = 'Información importante.') {
        Swal.fire({
            title: 'Información',
            text: message,
            icon: 'info',
            confirmButtonText: 'Entendido',
        });
    },
};

window.AlertManager = AlertManager;
