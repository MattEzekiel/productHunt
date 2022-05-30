import Header from "./Header";
import Head from "next/head";

export default function Layout({ children, titulo }) {
    return (
        <div>
            <Head>
                <html lang={"es"} />
                <title>{titulo}</title>
                <link rel="stylesheet" href="/static/css/app.css" />
            </Head>
            <Header />
            <main>
                {children}
            </main>
            <footer>
                <p>Footer</p>
            </footer>
        </div>
    )
}