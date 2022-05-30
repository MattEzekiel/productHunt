import Layout from "../layout/Layout";
import {useRouter} from "next/router";
import Producto from "../components/Producto";
import useProdcutos from "../hooks/useProdcutos";
import {useEffect, useState} from "react";
import Spinner from "../components/Spinner";

export default function Buscar() {
    const router = useRouter();
    const { query : { q } } = router;

    const { productos } = useProdcutos("creado");

    const [resultado, setResultado] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!q) return;

        const busqueda = q.toLocaleLowerCase();
        const filtro = productos.filter(producto => {
            return (
                producto.nombre.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(busqueda) ||
                producto.descripcion.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(busqueda)
            )
        });
        setResultado(filtro);
    },[q, productos]);

    return (
        <Layout
            titulo={"Buscar"}
        >
            <h1 className={"text-center pt-3"}>Buscar</h1>
            { loading && (
                <Spinner />
            )}
            <div className={"listado-productos"}>
                <div className="contenedor">
                    <ul className="bg-white">
                        { resultado[0] ?
                            resultado.map(producto => (
                            <Producto
                                key={producto.id}
                                producto={producto}
                                setLoading={setLoading}
                            />)
                        ) : (
                            <li><h2 className={"text-center"}>No hay datos</h2></li>
                            ) }
                    </ul>
                </div>
            </div>
        </Layout>
    )
}
