import Layout from "../layout/Layout";
import {Formulario, Campo, Submit, Error} from "../ui/Formulario";
import useValidacion from "../hooks/useValidacion";
import ValidarIniciarSesion from "../validacion/ValidarIniciarSesion";
import firebase from "../fr";
import {useState} from "react";
import {useRouter} from "next/router";

export default function Login() {
    const [error, setError] = useState('');
    const router = useRouter();

    const STATE_INCIAL = {
        email: '',
        password: ''
    }
    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INCIAL,ValidarIniciarSesion, iniciarSesion);

    const { email, password } = valores;

    async function iniciarSesion() {
        try {
            await firebase.login( email, password );
            await router.push('/');
        } catch (e) {
            console.error(e.message)
            setError(e.message);
        }
    }

    return (
        <Layout
            titulo={"Iniciar Sesión"}
        >
            <h1 style={{ textAlign: "center", marginTop: "5rem" }}>Iniciar Sesión</h1>
            <div
                style={{minHeight: "56.7vh"}}
            >
                <Formulario
                    onSubmit={handleSubmit}
                    noValidate
                    className={"bg-white"}
                >
                    { error && <Error>{error}</Error> }
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
                        value={"Iniciar Sesión"}
                    />
                </Formulario>
            </div>
        </Layout>
    )
}
