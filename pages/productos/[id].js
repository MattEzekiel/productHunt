import Layout from "../../layout/Layout";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import Producto404 from "../../layout/404";
import Styles from '../../styles/ProductoDetalle.module.css'
import {Campo, Submit} from "../../ui/Formulario";
import Boton from "../../ui/Boton";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export default function Product() {
    // State
    const [producto, setProducto] = useState('');
    const [error404, setError404] = useState(false);
    const [loading, setloading] = useState(true);
    const [comentario, setComentario] = useState({});
    const [consultarDB, setConsultarDB] = useState(true);

    // Routing
    const router = useRouter();
    const { query: { id }} = router;

    // Context
    const { firebase, usuario } = useContext(FirebaseContext);

    useEffect(() => {
        if (id && consultarDB) {
            const obtenerProducto = async () => {
                const docRef = doc(firebase.db, "productos", id);
                const docSnap = await getDoc(docRef);
                const datos = await docSnap.data();
                if (docSnap.exists()) {
                    setProducto(datos);
                    setConsultarDB(false);
                } else {
                    setError404(true);
                    setConsultarDB(false);
                }

                setloading(false);
            }

            obtenerProducto();
        }
    },[id, producto]);

    if (Object.keys(producto).length === 0 && !error404) {
        return (
            <Layout
                titulo={"Cargando"}
            >
             <h1 className={"text-center mt-3"}>Cargando...</h1>
            </Layout>
        )
    }

    const { comentarios, creado, descripcion, empresa, nombre, url, imagen, votos, creador, haVotado } = producto;

    const votarProducto = async () => {
        if (!usuario) {
            router.push('/login');
        }

        const total = Number(votos) + 1;

        if (!haVotado.includes(usuario.uid)) {
            const docRef = await doc(firebase.db, "productos", id);
            const nuevoVoto = [...haVotado, usuario.uid];

            try {
                await updateDoc(docRef, {
                    votos: total,
                    haVotado: nuevoVoto
                });

                setProducto({
                    ...producto,
                    votos: total
                });
            } catch (error) {
                console.error("Error",error)
            }

            setConsultarDB(true); // Hay un Voto
        }
    }

    const comentarioChange = e => {
        setComentario({
            ...comentario,
            [e.target.name] : e.target.value
        })
    }

    const esCreador = id => {
        if (creador.id === id) {
            return true;
        }
    }

    const agregarComentario = async e => {
        e.preventDefault();

        if (!usuario) {
            router.push('/login');
        }

        comentario.usuarioID = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;

        const nuevosComentarios = [...comentarios, comentario];

        const docRef = await doc(firebase.db, "productos", id);

        try {
            await updateDoc(docRef, {
                comentarios: nuevosComentarios
            });

            setProducto({
                ...producto,
                comentarios: nuevosComentarios
            });
        } catch (error) {
            console.error("Error",error)
        }

        setConsultarDB(true); // Hay un comentario
    }
    const puedeBorrar = () => {
        if (!usuario) return false;

        if (creador.id === usuario.uid) {
            return true;
        }
    }

    const eliminarProducto = async e => {
        e.preventDefault();

        if (!usuario) {
            router.push('/login');
        }

        if (creador.id !== usuario.uid) {
            return router.push('/');
        }

        try {
            await deleteDoc(doc(firebase.db, "productos", id));
            await router.push('/')
        } catch (e) {
            console.error(e)
        }
    }


    return (
        <Layout titulo={nombre ? nombre : 'Página no encontrada'}>
            { error404 ? (
                <Producto404 />
            ) : (
                <div className={"contenedor"}>
                    <h1 className={Styles.titulo}>{nombre}</h1>
                    <div className={Styles.contenedorProducto}>
                        <div className={"bg-white p-2"}>
                            <p>Publicado hace: {creado ? formatDistanceToNow( new Date(creado), {locale: es}) : formatDistanceToNow( Date.now(), {locale: es})}</p>
                            <p>Por: <span className={Styles.creador}>{creador?.nombre ? creador.nombre : ''}</span> <b>{empresa}</b></p>
                            <img className={Styles.imagen} src={imagen} alt={`${nombre} imagen`}/>
                            <p>{descripcion}</p>
                            { usuario && (
                                <form
                                    onSubmit={agregarComentario}
                                >
                                    <h2>Agrega tu comentario</h2>
                                    <Campo>
                                        <label htmlFor="cometario" className={"sr-only"}>Comentario</label>
                                        <textarea
                                            name={"comentario"}
                                            id={"comentario"}
                                            onChange={comentarioChange}
                                        />
                                    </Campo>
                                    <Submit
                                        type={"submit"}
                                        value={"Agregar Comentario"}
                                    />
                                </form>
                            )}
                            {comentarios?.length === 0 ? (<h3 className="text-center mt-3">Aún no hay comentarios</h3>) :
                                (
                                    <div>
                                        <h2 className={Styles.comentarioHeading}>Comentarios:</h2>
                                        {comentarios?.map( (comentario, index) => (
                                            <div
                                                className={Styles.comentario}
                                                key={index}
                                            >
                                                <p>{comentario.comentario}</p>
                                                <p>Escrito por: {comentario.usuarioNombre}</p>
                                                { esCreador(comentario.usuarioID) && (
                                                    <p className={Styles.esCreador}>Es Creador</p>
                                                )}
                                            </div>
                                    ))}
                                    </div>
                                )
                            }
                        </div>
                        <aside className={`bg-white p-2 ${Styles.aside}`}>
                            <Boton
                                target={"_blank"}
                                bgColor={true}
                                href={url}
                            >Visitar Sitio Web</Boton>
                            <p>{votos} Votos</p>
                            { usuario &&  (
                                <Boton
                                    onClick={votarProducto}
                                >Votar</Boton>
                            )}
                        </aside>
                    </div>
                    { puedeBorrar() && (
                        <div className={"mt-3"}>
                            <Boton
                                onClick={eliminarProducto}
                            >Eliminar Producto</Boton>
                        </div>
                    ) }
                </div>
            )}
        </Layout>
    )
}