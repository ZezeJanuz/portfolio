"use client";

import React, { FormEvent } from "react";

const ContactSection: React.FC = () => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const name = data.get("name");
        const email = data.get("email");
        const message = data.get("message");

        const subject = encodeURIComponent("Contact portfolio");
        const body = encodeURIComponent(
            `Nom: ${name}\nEmail: ${email}\n\n${message}`
        );

        window.location.href = `mailto:ton.email@exemple.com?subject=${subject}&body=${body}`;
    };

    return (
        <section id="contact" className="section">
            <div className="section-inner">
                <h2 className="section-title">Contact</h2>
                <p className="section-text">
                    Une idée, un projet, une opportunité ? Écrivez-moi.
                </p>

                <form className="contact-form" onSubmit={handleSubmit}>
                    {/* ... mêmes inputs que je t’avais mis ... */}
                </form>
            </div>
        </section>
    );
};

export default ContactSection;