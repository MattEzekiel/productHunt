import Layout from "../layout/Layout";
import {useContext, useEffect, useState} from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import {FirebaseContext} from "../firebase";
import Producto from "../components/Producto";

export default function Home() {
    const [productos, setProductos] = useState([]);
    const { firebase } = useContext(FirebaseContext);


    useEffect(() => {
        let productosArray = [];
        const obtenerProductos = async () => {
           const queryFirebase = await query(collection(firebase.db,"productos"), orderBy('creado','desc'));
           const querySnapshot = await getDocs(queryFirebase);
           // console.log(querySnapshot)
           querySnapshot.forEach(doc => {
               productosArray.push({
                   id: doc.id,
                   ...doc.data()
               })
           });
            setProductos(productosArray);
        }

        obtenerProductos();
    },[]);

  return (
      <Layout
        titulo={"Inicio"}
      >
        <div className={"listado-productos"}>
            <div className="contenedor">
                <ul className="bg-white">
                    { productos.map(producto => (
                        <Producto
                            key={producto.id}
                            producto={producto}
                        />)
                    ) }
                </ul>
            </div>
        </div>
      </Layout>
  )
}
