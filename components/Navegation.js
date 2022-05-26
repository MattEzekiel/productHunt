import Link from "next/link";
import Styles from '../styles/Navigation.module.css';

export default function Navegation() {
    return(
        <nav className={Styles.nav}>
            <ul>
                <li>
                    <Link href={"/"}>Inicio</Link>
                </li>
                <li>
                    <Link href={"/populares"}>Populares</Link>
                </li>
                <li>
                    <Link href={"/nuevo-producto"}>Nuevo Producto</Link>
                </li>
            </ul>
        </nav>
    )
}