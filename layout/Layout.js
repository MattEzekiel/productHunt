import Header from "./Header";
import {useEffect, useState} from "react";
import Footer from "./Footer";

export default function Layout({ children, titulo }) {
    const [ready,setReady] = useState(false);

    useEffect(() => {
        setReady(true);
    },[])
    return (
        <div>
            {ready && (
                <head>
                    <title>{titulo}</title>
                    <link rel="stylesheet" href="/static/css/app.css" />
                </head>
            )}
            <Header />
            <main className={"py-3"}>
                {children}
            </main>
            <Footer />
        </div>
    )
}