import Styles from '../styles/Spinner.module.css'

export default function Spinner() {
    return (
        <div className={Styles.spinnerContenedor}>
            <div className={Styles.spinner}>
                <span className={"sr-only"}>Cargando...</span>
            </div>
        </div>
    )
}