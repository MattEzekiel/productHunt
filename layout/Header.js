import Link from "next/link";
import Buscar from "../ui/Buscar";
import Navegation from "../components/Navegation";
import Styles from '../styles/Header.module.css';
import Boton from "../ui/Boton";
import { FirebaseContext } from '../firebase';
import {useContext} from "react";

export default function Header() {
    const { usuario , firebase } = useContext(FirebaseContext);
    // console.log(usuario);

    return (
        <header className={Styles.header}>
            <div className={Styles.contenedor}>
                <div className={Styles.ui}>
                    <Link href={"/"}>
                        <a><p className={Styles.logo}>P</p></a>
                    </Link>
                    <Buscar />
                    <Navegation />
                </div>
                <div className={Styles.ui}>
                        { usuario ? (
                            <ul className={Styles.ul}>
                                <li>Hola: {usuario.displayName}</li>
                                <li>
                                    <Boton
                                        bgColor={"true"}
                                        onClick={() => firebase.cerrarSession()}
                                    >Cerrar Sesión</Boton>
                                </li>
                            </ul>
                        ) : (
                          <ul className={Styles.ul}>
                              <li>
                                  <Link href={"/login"}>
                                      <a><Boton bgColor={"true"}>Iniciar Sesión</Boton></a>
                                  </Link>
                              </li>
                              <li>
                                  <Link href={"/crear-cuenta"}>
                                      <a><Boton>Crear Cuenta</Boton></a>
                                  </Link>
                              </li>
                          </ul>
                        )}
                </div>
            </div>
        </header>
    )
}