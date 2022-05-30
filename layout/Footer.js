import Styles from '../styles/Footer.module.css';

export default function Footer() {
    return (
        <footer className={`bg-dark ${Styles.footer}`}>
            <p className={"text-center"}>Todos los derechos reservados &copy; Product Hunt {new Date().getFullYear()}</p>
        </footer>
    )
}