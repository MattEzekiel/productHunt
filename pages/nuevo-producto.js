import Layout from "../layout/Layout";
import {Formulario, Campo, Submit, Error} from "../ui/Formulario";
import useValidacion from "../hooks/useValidacion";
import validarCrearProducto from "../validacion/validarCrearProducto";
import { FirebaseContext } from "../firebase";
import {useContext, useState} from "react";
import {useRouter} from "next/router";
import { collection , addDoc } from 'firebase/firestore';
// import FirebaseFileUploader from "react-firebase-file-uploader/src";
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import resizeAndCropImage from "react-firebase-file-uploader/lib/utils/image";

export default function NuevoProducto(){
    // State imagenes
    const [nombreImagen, setNombre] = useState('');
    const [subiendo, setSubiendo] = useState(false);
    const [progreso, setProgreso] = useState(0);
    const [urlImagen, setUrlImagen] = useState('');

    const [error, setError] = useState('');
    const router = useRouter();

    const STATE_INCIAL = {
        nombre: '',
        empresa: '',
        // imagen: '',
        url: '',
        descripcion: ''
    }
    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INCIAL,validarCrearProducto, crearProducto);

    const { nombre, empresa, imagen, url, descripcion } = valores;

    const { usuario, firebase } = useContext(FirebaseContext);

    async function crearProducto() {
        const [uploading, setUploading] = useState(false);
        const [URLImage, setURLImage] = useState('');

        if (!usuario) {
            return router.push('/');
        }

        const handleImageUpload = e => {
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
                        setURLImage(url);
                    });
                }
            );
        };

        const producto = {
            nombre,
            empresa,
            url,
            urlImagen,
            descripcion,
            votos: 0,
            comentarios: [],
            creado: Date.now()
        }

        try {
            await addDoc(collection(firebase.db,"productos"), producto);
        } catch (error) {
            console.error(error)
        }
    }

    const handleImageUpload = e => {
        console.log(e.target.files);
    }


    return (
        <Layout
            titulo={"Agregar Nuevo Producto"}
        >
            <h1 style={{ textAlign: "center", marginTop: "5rem" }}>Agregar Nuevo Producto</h1>
            <Formulario
                onSubmit={handleSubmit}
                noValidate
            >
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
                <Submit
                    type="submit"
                    value={"Crear Producto"}
                />
            </Formulario>
        </Layout>
    )
}