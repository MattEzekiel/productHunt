import Layout from "../layout/Layout";
import {Formulario, Campo, Submit, Error} from "../ui/Formulario";
import useValidacion from "../hooks/useValidacion";
import validarCrearProducto from "../validacion/validarCrearProducto";
import { FirebaseContext } from "../firebase";
import {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import { collection , addDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import Mensaje from "../components/Mensaje";
import GoogleMaps from "../components/GoogleMaps";

export default function NuevoProducto(){
    // State imagenes
    const [urlImagen, setUrlImagen] = useState('');
    const [uploading, setUploading] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [tipo, setTipo] = useState('');
    const [mostrarDireccion, setMostrarDireccion] = useState(false);
    const [direccion, setDireccion] = useState({});
    const [latitud, setLatitud] = useState(0);
    const [longitud, setLongitud] = useState(0);

    const [error, setError] = useState('');
    const router = useRouter();

    const STATE_INCIAL = {
        nombre: '',
        empresa: '',
        imagen: '',
        url: '',
        descripcion: '',
        longitud: 0,
        latitud: 0,
        direccion: ''
    }
    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INCIAL,validarCrearProducto, crearProducto);

    const { nombre, empresa, imagen, url, descripcion } = valores;

    const { usuario, firebase } = useContext(FirebaseContext);

    const handleImageUpload = e => {
        // console.log('Me ejecuté')
        // Se obtiene referencia de la ubicación donde se guardará la imagen
        const file = e.target.files[0];
        const imageRef = ref(firebase.storage, 'products/' + file.name);

        // Se inicia la subida
        setUploading(true);
        const uploadTask = uploadBytesResumable(imageRef, file);

        // Registra eventos para cuando detecte un cambio en el estado de la subida
        uploadTask.on('state_changed',
            // Muestra progreso de la subida
            snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Subiendo imagen: ${progress}% terminado`);
            },
            // En caso de error
            error => {
                setUploading(false);
                console.error(error);
            },
            // Subida finalizada correctamente
            () => {
                setUploading(false);
                getDownloadURL(uploadTask.snapshot.ref).then(url => {
                    console.log('Imagen disponible en:', url);
                    setUrlImagen(url);
                });
            }
        );
    };

    const handleCheck = e => {
        e.target.checked ? setMostrarDireccion(true) : setMostrarDireccion(false);
    }

    useEffect(() => {
        if (!usuario) {
            return router.push("/404");
        }
    },[router])

    async function crearProducto() {

        const producto = {
            nombre,
            empresa,
            url,
            imagen: urlImagen,
            descripcion,
            lat: Number(latitud),
            lng: Number(longitud),
            direccion,
            votos: 0,
            comentarios: [],
            creado: Date.now(),
            creador: {
                id: usuario.uid,
                nombre: usuario.displayName
            },
            haVotado: []
        }

        try {
           await addDoc(collection(firebase.db, "productos"), producto);
            setTipo('success');
            setMensaje('Producto agregado exitosamente');

           setTimeout(() => {
               setMensaje('');
           },3000);
        } catch (error) {
            console.error(error);
            setMensaje('Ocurrió un error');
            setTipo('error');

            setTimeout(() => {
                setMensaje('');
            },5000);
        }
    }


    return (
        <Layout
            titulo={"Agregar Nuevo Producto"}
        >
            <h1 style={{ textAlign: "center", paddingTop: "5rem" }}>Agregar Nuevo Producto</h1>
            <Formulario
                onSubmit={handleSubmit}
                noValidate
                className={"bg-white"}
            >
                { mensaje && (
                    <Mensaje
                        tipo={tipo}
                        mensaje={mensaje}
                    />
                )}
                <fieldset>
                    <legend>Información general</legend>
                    { error && <Error>{error}</Error> }
                    <Campo>
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type={"text"}
                            name={"nombre"}
                            id={"nombre"}
                            placeholder={"Nombre del producto"}
                            value={nombre}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Campo>
                    {errores.nombre && (<Error>{errores.nombre}</Error>)}
                    <Campo>
                        <label htmlFor="nombre">Empresa</label>
                        <input
                            type={"text"}
                            name={"empresa"}
                            id={"empresa"}
                            placeholder={"Empresa o compañía"}
                            value={empresa}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Campo>
                    {errores.empresa && (<Error>{errores.empresa}</Error>)}
                    <Campo>
                        <label htmlFor="imagen">Imagen</label>
                        <input
                            accept={"image/*"}
                            type={"file"}
                            name={"imagen"}
                            id={"imagen"}
                            value={imagen}
                            onChange={handleImageUpload}
                        />
                    </Campo>
                    {errores.imagen && (<Error>{errores.imagen}</Error>)}
                    <Campo>
                        <label htmlFor="url">Url</label>
                        <input
                            type={"url"}
                            name={"url"}
                            id={"url"}
                            value={url}
                            placeholder={"URL única del producto"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Campo>
                    {errores.url && (<Error>{errores.url}</Error>)}
                </fieldset>
                <fieldset>
                    <legend>Sobre tu producto</legend>
                    <Campo>
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea
                            name={"descripcion"}
                            id={"descripcion"}
                            value={descripcion}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Campo>
                    {errores.descripcion && (<Error>{errores.descripcion}</Error>)}
                </fieldset>
                <fieldset>
                    <legend>Dirección</legend>
                    <input
                        type="checkbox"
                        id={"check"}
                        name={"check"}
                        onChange={handleCheck}
                    />
                    <label htmlFor="check" style={{ paddingLeft: '10px'}}>¿Tiene dirección física?</label>
                    { mostrarDireccion && (
                        <div style={{ maxWidth: '530px', position: 'relative', maxHeight: "fit-content", overflow: 'hidden'}}>
                            <label htmlFor="direccion">Seleccione la dirección</label>
                            <GoogleMaps
                                direccion={direccion}
                                setDireccion={setDireccion}
                                latitud={latitud}
                                setLatitud={setLatitud}
                                longitud={longitud}
                                setLongitud={setLongitud}
                            />
                        </div>
                    )}
                </fieldset>
                <Submit
                    type="submit"
                    value={"Crear Producto"}
                />
            </Formulario>
        </Layout>
    )
}