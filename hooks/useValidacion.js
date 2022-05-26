import { useState, useEffect } from "react";

const useValidacion = ( stateInicial, validar, fn ) => {
    const [valores, setvalores] = useState(stateInicial);
    const [errores, setErrores] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        if (submitForm) {
            const noErrores = Object.keys(errores).length === 0;

            if (noErrores) {
                fn(); // La función que se ejecuta en el componente
            }

            setSubmitForm(false);
        }
    },[errores]);

    // Función que se ejecuta conforme el usuario escribe algo
    const handleChange = e => {
        setvalores({
            ...valores,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        setErrores(erroresValidacion);
        setSubmitForm(true);
    }

    const handleBlur = () => {
        const erroresValidacion = validar(valores);
        setErrores(erroresValidacion);
    }

    return {
        valores,
        errores,
        handleSubmit,
        handleChange,
        handleBlur
    };
}

export default useValidacion;