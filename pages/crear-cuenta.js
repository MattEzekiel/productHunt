import Layout from "../layout/Layout";
import {Formulario, Campo, Submit, Error} from "../ui/Formulario";
import useValidacion from "../hooks/useValidacion";
import validarCrearCuenta from "../validacion/validarCrearCuenta";
import firebase from "../firebase";
import {useState} from "react";
import {useRouter} from "next/router";

export default function CrearCuenta() {
    const [error, setError] = useState('');
    const router = useRouter();

    const STATE_INCIAL = {
        nombre: '',
        email: '',
        password: ''
    }
    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INCIAL,validarCrearCuenta, crearCuenta);

    const { nombre, email, password } = valores;

    async function crearCuenta() {
        try {
            await firebase.registrar(nombre, email, password);
            await router.push('/');
        }
        catch (error) {
            if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                console.error("Error al crear el usuario:", error.message);
                setError(error.message);
            } else {
                await router.push('/');
            }
        }
    }

    return (
        <Layout
            titulo={"Crear Cuenta"}
        >
            <h1 style={{ textAlign: "center", marginTop: "5rem" }}>Crear Cuenta</h1>
            <Formulario
                onSubmit={handleSubmit}
                noValidate
            >
                { error && <Error>{error}</Error> }
                <Campo>
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type={"text"}
                        name={"nombre"}
                        id={"nombre"}
                        placeholder={"Tu nombre"}
                        value={nombre}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Campo>
                {errores.nombre && (<Error>{errores.nombre}</Error>)}
                <Campo>
                    <label htmlFor="email">Email</label>
                    <input
                        type={"email"}
                        name={"email"}
                        id={"email"}
                        placeholder={"Tu email"}
                        value={email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Campo>
                {errores.email && (<Error>{errores.email}</Error>)}
                <Campo>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type={"password"}
                        name={"password"}
                        id={"password"}
                        placeholder={"Tu contraseña"}
                        value={password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Campo>
                {errores.password && (<Error>{errores.password}</Error>)}
                <Submit
                    type="submit"
                    value={"Crear Cuenta"}
                />
            </Formulario>
        </Layout>
    )
}
