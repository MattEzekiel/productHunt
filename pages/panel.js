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
            <h1 className={"text-center pt-3"}>Panel</h1>
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