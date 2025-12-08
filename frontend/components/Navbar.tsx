"use client";

import React from "react";

const Navbar: React.FC = () => {
    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <header className="navbar">
            <button
                className="navbar-logo"
                onClick={() => scrollTo("top")}
                aria-label="Retour en haut de page"
            >
                Louise Ducrocq
            </button>
            <nav className="navbar-links">
                <button onClick={() => scrollTo("about")}>À propos</button>
                <button onClick={() => scrollTo("projects")}>Projets</button>
                <button onClick={() => scrollTo("contact")}>Contact</button>
                <a
                    href="/cv-louise-ducrocq.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="cv-link"
                >
                    CV
                </a>
            </nav>
        </header>
    );
};

export default Navbar;