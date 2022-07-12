import Layout from "../../layout/Layout";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../fr";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import Producto404 from "../../layout/404";
import Styles from '../../styles/ProductoDetalle.module.css'
import { Campo, Submit } from "../../ui/Formulario";
import Boton from "../../ui/Boton";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import GoogleMaps from "../../components/GoogleMaps";
import Votar from "../../ui/Votar";

export default function Product() {
    // State
    const [producto, setProducto] = useState('');
    const [error404, setError404] = useState(false);
    const [loading, setloading] = useState(true);
    const [comentario, setComentario] = useState({});
    const [consultarDB, setConsultarDB] = useState(true);
    const [dir, setDireccion] = useState('');
    const [detalle, setDetalle] = useState(true);

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

    const { comentarios, creado, descripcion, empresa, nombre, url, imagen, votos, creador, haVotado, lat, lng, direccion } = producto;

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

        // Usuario admin puede borrar cursos
        if (creador.id === usuario.uid || usuario.uid === 'zEHVOc7x0uddvyjExry5n53aMVC3') {
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
                            <p style={{ marginTop: "30px" }}>{votos} Votos</p>
                            { usuario &&  (
                                <Votar
                                    onClick={votarProducto}
                                ><svg style={{ maxWidth: "30px", width: "100%" }} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
                                </svg></Votar>
                            )}
                            { typeof direccion === "string" && (
                                <div style={{ maxWidth: '450px', position: 'relative', maxHeight: "fit-content", overflow: 'hidden'}}>
                                    <p>Dirección: {direccion} </p>
                                    <GoogleMaps
                                        latitud={lat}
                                        longitud={lng}
                                        direccion={direccion}
                                        setDireccion={setDireccion}
                                        detalle={detalle}
                                    />
                                </div>
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