import Layout from "../layout/Layout";
import Producto from "../components/Producto";
import useProdcutos from "../hooks/useProdcutos";
import {useEffect, useState} from "react";
import Spinner from "../components/Spinner";

export default function Populares() {
    const { productos } = useProdcutos("votos");

    const [loading, setLoading] = useState(true);

    return (
        <Layout
            titulo={"Populares"}
        >
            <h1 className={"text-center pt-3"}>Populares</h1>
            { loading && (
                <Spinner />
            )}
            <div className={"listado-productos mt-3"}>
                <div className="contenedor">
                    <ul className="bg-white">
                        { productos.map(producto => (
                            <Producto
                                key={producto.id}
                                producto={producto}
                                setLoading={setLoading}
                            />)
                        ) }
                    </ul>
                </div>
            </div>
        </Layout>
    )
}
