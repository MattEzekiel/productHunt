import {initializeApp} from 'firebase/app';
import firebaseConfig from "./config";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile} from "@firebase/auth";
import "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

class Firebase {
    constructor() {
        const app = initializeApp(firebaseConfig);
        this.auth = getAuth(app);
        this.db = getFirestore(app);
        this.storage = getStorage(app);
    }

    /**
     * Registrarse
     * @param nombre
     * @param email
     * @param password
     * @returns {Promise<void>}
     */
    async registrar(nombre, email, password) {
        const { user } = await createUserWithEmailAndPassword(
            this.auth,
            email,
            password
        );

        const auth = await getAuth();
        return await updateProfile(auth.currentUser, {
            displayName : nombre
        });
    }

    /**
     * Iniciar Sesión
     * @param email
     * @param password
     * @returns {Promise<UserCredential>}
     */
    async login(email, password) {
        const auth = getAuth();

        return await signInWithEmailAndPassword(auth, email, password);
    }

    async cerrarSession() {
        const auth = getAuth();
        return await auth.signOut();
    }
}

const firebase = new Firebase();
export default firebase;