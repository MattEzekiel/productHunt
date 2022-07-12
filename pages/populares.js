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
            <h1 className={"text-center pt-3 flex justify-center"}>
                <svg style={{ maxWidth: "30px" }} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd"
                          d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                          clipRule="evenodd"/>
                </svg> Populares <svg style={{ maxWidth: "30px" }} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd"
                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                      clipRule="evenodd"/>
            </svg></h1>
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
