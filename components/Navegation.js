import Link from "next/link";
import Styles from '../styles/Navigation.module.css';
import {useContext} from "react";
import {FirebaseContext} from "../firebase";

export default function Navegation() {
    const { usuario } = useContext(FirebaseContext);
    return(
        <nav className={Styles.nav}>
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
            </ul>
        </nav>
    )
}