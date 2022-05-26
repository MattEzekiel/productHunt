import Styles from '../styles/Bucar.module.css'

export default function Buscar() {
    return (
        <form className={Styles.form}>
            <label
                className={"sr-only"}
                htmlFor={"buscar"}
            >Buscar</label>
            <input
                className={Styles.inputText}
               type={"text"}
               name={"buscar"}
               id={"buscar"}
                placeholder={"Buscar productos"}
            />
            <button
                type={"submit"}
                className={Styles.inputSubmit}
            >Buscar</button>
        </form>
    )
}