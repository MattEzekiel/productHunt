export default function validarCrearProducto(valores) {
    let errores = {};

    // Validar el nombre del usuario
    if (!valores.nombre) {
        errores.nombre = "El nombre es obligatorio";
    }

    if (!valores.empresa) {
        errores.empresa = "El nombre de la empresa es obligatorio";
    }

    if (!valores.url) {
        errores.url = "La URL del  producto es  obligatoria";
    } else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
        errores.url = "La URL no es válida";
    }

    // Validar descripción
    if (!valores.descripcion) {
        errores.descripcion = "Agrega la descripción del prodcuto"
    }

    return errores;
}