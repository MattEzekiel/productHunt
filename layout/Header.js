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
                                <li style={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: "5px" }}>
                                    <svg style={{ width: "20px"}} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                               viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                    </svg><span style={{ textTransform: "capitalize" }}>{usuario.displayName.toLowerCase()}</span></li>
                                <li>
                                    <Boton
                                        bgColor={"true"}
                                        onClick={() => firebase.cerrarSession()}
                                    >Cerrar Sesión <svg style={{ maxWidth: "20px", width: "100%" }} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                                    </svg></Boton>
                                </li>
                            </ul>
                        ) : (
                          <ul className={Styles.ul}>
                              <li>
                                  <Link href={"/login"}>
                                      <a><Boton bgColor={"true"}>Iniciar Sesión <svg style={{ maxWidth: "20px", width: "100%" }} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                          <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                                      </svg></Boton></a>
                                  </Link>
                              </li>
                              <li>
                                  <Link href={"/crear-cuenta"}>
                                      <a><Boton>Crear Cuenta <svg style={{ maxWidth: "20px", width: "100%"}} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                          <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                                      </svg></Boton></a>
                                  </Link>
                              </li>
                          </ul>
                        )}
                </div>
            </div>
        </header>
    )
}