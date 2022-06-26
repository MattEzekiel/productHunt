import Link from "next/link";
import Buscar from "../ui/Buscar";
import Navegation from "../components/Navegation";
import Styles from '../styles/Header.module.css';
import Boton from "../ui/Boton";
import { FirebaseContext } from '../firebase';
import {useContext, useEffect, useState} from "react";
import {is_mobile} from "../helpers/responsive";

export default function Header() {
    const { usuario , firebase } = useContext(FirebaseContext);
    const [mobile, setMobile] = useState(false);
    const [abrir, setAbrir] = useState(false);

    useEffect(() => {
        setMobile(is_mobile);
        window.addEventListener('resize', () => {
            setMobile(is_mobile());
        });
    },[])

    const handleMenu = () => {
        setAbrir(!abrir);
    }

    return (
        <header className={Styles.header}>
            <div className={Styles.contenedor}>
                <div className={Styles.ui}>
                    <Link href={"/"}>
                        <a>
                            <p className={Styles.logo}>P</p>
                        </a>
                    </Link>
                    <Buscar />
                    { mobile ? (
                        <div>
                            <button
                                type={"button"}
                                id={"hamburguesa"}
                                onClick={handleMenu}
                                className={Styles.hamburguesa}
                            >
                                <span className={abrir ? Styles.abierto : ''}>Menu</span>
                            </button>
                            <Navegation
                                abrir={abrir}
                            />
                        </div>
                    ) : (
                        <Navegation />
                    ) }
                </div>
                <div className={Styles.ui}>
                        { usuario ? (
                            <ul className={Styles.ul}>
                                <li>Hola: <span style={{ textTransform: "capitalize" }}>{usuario.displayName.toLowerCase()}</span></li>
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