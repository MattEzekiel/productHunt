import Layout from "../layout/Layout";
import Producto from "../components/Producto";
import useProdcutos from "../hooks/useProdcutos";
import {useEffect, useState} from "react";
import Spinner from "../components/Spinner";

export default function Home() {
    const { productos } = useProdcutos("creado");

    const [loading, setLoading] = useState(true);

  return (
      <Layout
        titulo={"Inicio"}
      >
        <h1 className={"text-center pt-3"}>Cursos</h1>
          { loading && (
              <Spinner />
          )}
            <div className={"listado-productos"}>
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
