import Layout from "../layout/Layout";
import useProdcutos from "../hooks/useProdcutos";
import { useState } from "react";
import Spinner from "../components/Spinner";
import TablaProducto from "../components/TablaProducto";

export default function Panel() {
    const { productos } = useProdcutos("creado");

    const [loading, setLoading] = useState(true);

    return (
        <Layout
            titulo={"Inicio"}
        >
            <h1 className={"text-center pt-3"}>
                <svg style={{ maxWidth: "20px" }} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                </svg> Panel <svg style={{ maxWidth: "20px" }} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                  stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
            </svg></h1>
            { loading && (
                <Spinner />
            )}
            <div className={"listado-productos"}>
                <div className="contenedor bg-white p-2">
                    <table className={"table table-striped table-hover"}>
                        <thead>
                            <tr>
                                <th>Creador</th>
                                <th>Nombre del curso</th>
                                <th>Descripción</th>
                                <th>Imagen</th>
                                <th>URL</th>
                                <th>Comentarios</th>
                                <th>Votos</th>
                                <th>Fecha de creación</th>
                                <th>Detalle</th>
                            </tr>
                        </thead>
                        <tbody>
                            { productos.map(producto => (
                                <TablaProducto
                                    key={producto.id}
                                    producto={producto}
                                    setLoading={setLoading}
                                />
                            )) }
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}