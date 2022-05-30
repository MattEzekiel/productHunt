import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, titulo }) {
    return (
        <>
            <head>
                <title>{titulo}</title>
                <link rel="stylesheet" href="/static/css/app.css" />
            </head>
            <Header />
            <main className={"py-3"}>
                {children}
            </main>
            <Footer />
        </>
    )
}