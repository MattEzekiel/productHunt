import {useContext, useEffect, useState} from "react";
import {FirebaseContext} from "../firebase";
import {collection, getDocs, orderBy, query} from "firebase/firestore";

const useProdcutos = orden => {
    const [productos, setProductos] = useState([]);
    const { firebase } = useContext(FirebaseContext);


    useEffect(() => {
        let productosArray = [];
        const obtenerProductos = async () => {
            const queryFirebase = await query(collection(firebase.db,"productos"), orderBy(orden,'desc'));
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

    return {
        productos
    }
}

export default useProdcutos;