import {useEffect, useState} from "react";
import {formatDistanceToNow} from "date-fns";
import {es} from 'date-fns/locale';
import Link from "next/link";
import Styles from '../styles/TablaProductos.module.css';

export default function TablaProducto({ producto, setLoading }) {
    const { id, comentarios, creado, descripcion, nombre, imagen, votos, url, creador } = producto;
    const [imgReady, setImgReady] = useState(false);

    useEffect(() => {
        setLoading(false);
    },[]);

    return (
        <tr>
            <td>{ creador.nombre }</td>
            <td style={{ textAlign: "left" }}>{ nombre }</td>
            <td style={{ textAlign: "left" }}>{ descripcion }</td>
            <td>
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
            </td>
            <td>{url}</td>
            <td>{comentarios.length}</td>
            <td>{votos}</td>
            <td>{formatDistanceToNow(new Date(creado), { locale: es })}</td>
            <td><Link href={`/productos/${id}`}><a>Ver</a></Link></td>
        </tr>
    )
}