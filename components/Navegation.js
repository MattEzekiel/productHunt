import Link from "next/link";
import Styles from '../styles/Navigation.module.css';
import {useContext} from "react";
import { FirebaseContext } from "../fr";

export default function Navegation({abrir}) {
    const { usuario } = useContext(FirebaseContext);

    return(
        <nav className={`${Styles.nav} ${abrir ? Styles.abierto : ''}`}>
            <ul>
                <li>
                    <Link href={"/"}>Inicio</Link>
                </li>
                <li>
                    <Link href={"/populares"}>Populares</Link>
                </li>
                {
                    usuario && (
                        <li>
                            <Link href={"/nuevo-producto"}>Nuevo Producto</Link>
                        </li>
                    )
                }
                {
                    usuario?.uid === 'zEHVOc7x0uddvyjExry5n53aMVC3' && (
                        <li>
                            <Link href={"/panel"}>Panel</Link>
                        </li>
                    )
                }
            </ul>
        </nav>
    )
}