import Styles from '../styles/Prodcuto.module.css';
import {formatDistanceToNow} from "date-fns";
import {es} from 'date-fns/locale'
import Link from "next/link";
import {useEffect} from "react";

export default function Producto({producto, setLoading}) {
    const { id, comentarios, creado, descripcion, empresa, nombre, url, imagen, votos } = producto;

    useEffect(() => {
        setLoading(false);
    },[])

    return (
        <li className={Styles.li}>
            <div className={Styles.descripcion}>
                <div>
                    <img className={Styles.imagen} src={imagen} alt={`${nombre} imagen`} />
                </div>
                <div>
                    <Link href={`/productos/${id}`}>
                        <h2 className={Styles.titulo}>{nombre}</h2>
                    </Link>
                    <p className={Styles.descripcionText}>{descripcion}</p>
                    <div className={Styles.comentario}>
                        <div className={Styles.comentarioContendor}>
                            <img className={Styles.comentarioImg} src={"/static/img/comentario.png"} alt={"Comentarios"} />
                            <p className={Styles.comentarioP}>{comentarios.length} comentarios</p>
                        </div>
                    </div>
                    <p>Publicado hace: {formatDistanceToNow( new Date(creado), {locale: es})}</p>
                </div>
            </div>
            <div className={Styles.votosContenedor}>
                <span className={Styles.flecha}>&#9650;</span>
                <p className={Styles.votos}>{votos}</p>
            </div>
        </li>
    )
}