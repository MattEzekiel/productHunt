import firebase from "../fr";
import {useEffect, useState} from "react";

function useAutentificacion() {
    const [ usuarioAutenticado, setUsuarioAutenticado ] = useState(null)

    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(user => {
            if (user) {
                setUsuarioAutenticado(user)
            }  else {
                setUsuarioAutenticado(null);
            }
        });

        return () => unsuscribe();
    },[]);

    return usuarioAutenticado;
}

export default useAutentificacion;