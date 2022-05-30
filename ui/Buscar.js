import React from "react";
import Styles from '../styles/Bucar.module.css'
import {useState} from "react";
import {useRouter} from "next/router";

export default function Buscar() {
    const [busqueda, setBusqueda] = useState('');
    const router = useRouter();

    const buscarProducto = (e) => {
      e.preventDefault();

      if (busqueda.trim() !== '') {
          router.push({
              pathname: '/buscar',
              query: { q: busqueda }
          })
      }
    }

    return (
        <form
            className={Styles.form}
            onSubmit={buscarProducto}
        >
            <label
                className={"sr-only"}
                htmlFor={"buscar"}
            >Buscar</label>
            <input
                className={Styles.inputText}
                type={"text"}
                name={"buscar"}
                id={"buscar"}
                placeholder={"Buscar productos"}
                onChange={e => setBusqueda(e.target.value)}
            />
            <button
                type={"submit"}
                className={Styles.inputSubmit}
            >Buscar</button>
        </form>
    )
}