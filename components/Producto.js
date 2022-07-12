import Styles from '../styles/Prodcuto.module.css';
import {formatDistanceToNow} from "date-fns";
import {es} from 'date-fns/locale'
import Link from "next/link";
import {useEffect, useState} from "react";

export default function Producto({producto, setLoading}) {
    const { id, comentarios, creado, descripcion, nombre, imagen, votos } = producto;

    const [imgReady, setImgReady] = useState(false);

    useEffect(() => {
        setLoading(false);
    },[]);

    return (
        <li className={Styles.li}>
            <div className={Styles.descripcion}>
                <div>
                    <picture>
                        { !imgReady && (
                            <img
                                className={Styles.imgLoader}
                                src={"/static/img/pre-loading.jpg"}
                                alt="Cargando imagen"
                            />
                        ) }
                        <img
                            className={Styles.imagen}
                            src={imagen}
                            alt={`${nombre} imagen`}
                            onLoad={() => setImgReady(true)}
                        />
                    </picture>
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
                <span className={Styles.flecha}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
  <path strokeLinecap="round" strokeLinejoin="round"
        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
</svg></span>
                <p className={Styles.votos}>{votos}</p>
            </div>
        </li>
    )
}