const AlertManager = {

    showError(message = 'Ocurrió un error inesperado.') {
        Swal.fire({
            title: 'Error',
            text: message,
            icon: 'error',
            confirmButtonText: 'OK',
        });
    },

    showCancel(message = 'Acción cancelada') {
        Swal.fire({
            title: 'Cancelado',
            text: message,
            icon: 'info',
            confirmButtonText: 'OK',
        });
    },

    showWarning(message = '¿Estás seguro de continuar?', confirmCallback, cancelCallback) {
        Swal.fire({
            title: 'Advertencia',
            text: message || '¿Estás seguro de continuar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                if (typeof confirmCallback === 'function') {
                    confirmCallback();
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                if (typeof cancelCallback === 'function') {
                    cancelCallback();
                }
            }
        });
    },
    
    showTimedAlert(message = 'Esto desaparecerá en 3 segundos.', time = 1000, isSuccess) {
        Swal.fire({
            title: 'Aviso',
            html: message,
            icon: isSuccess ? 'success' : 'error',
            timer: time,
            timerProgressBar: true,
            showConfirmButton: false,
        });
    },
};

window.AlertManager = AlertManager;
