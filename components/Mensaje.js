import Styles from '../styles/Mensaje.module.css';

export default function Mensaje({tipo, mensaje}) {
    return (
        <div
            className={tipo === 'success' ? Styles.success : Styles.error}
        >
            <p className={"text-center"}>{mensaje}</p>
        </div>
    )
}