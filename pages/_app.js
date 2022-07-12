import '../styles/globals.css';
import firebase, { FirebaseContext } from "../fr";
import useAutentificacion from "../hooks/useAutentificacion";

function MyApp({ Component, pageProps }) {
    const usuario = useAutentificacion();

  return (
      <FirebaseContext.Provider
        value={{
            firebase,
            usuario
        }}
      >
        <Component {...pageProps} />
      </FirebaseContext.Provider>
  )
}

export default MyApp
