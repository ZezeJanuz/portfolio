import React from "react";
import Image from "next/image";

const AboutSection: React.FC = () => {
    return (
        <section id="about" className="section">
            <div className="section-inner">
                <div className="about-grid">
                    {/* Avatar à gauche */}
                    <div className="about-avatar">
                        <Image
                            src="/avatarLouise1.png"
                            alt="Avatar de Louise Ducrocq"
                            width={160}
                            height={160}
                        />
                    </div>

                    {/* Texte à droite */}
                    <div>
                        <h2 className="section-title">À propos</h2>
                        <p className="about-text">
                            Je suis développeuse d&apos;applications en alternance, passionnée par
                            la création d&apos;interfaces ludiques et accessibles. J&apos;aime
                            particulièrement travailler avec des stacks modernes (React,
                            TypeScript, .NET, Flutter…) et donner une identité visuelle forte aux
                            projets sur lesquels je travaille.
                        </p>
                        <p className="about-text">
                            Mon objectif : concevoir des applications propres, maintenables et
                            agréables à utiliser – avec toujours une petite touche de fun.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;