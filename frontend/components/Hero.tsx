// components/Hero.tsx
"use client";

import Image from "next/image";
import React from "react";

const Hero: React.FC = () => {
    return (
        <section id="top" className="hero">
            <div className="hero-content">
                <p className="hero-name">LOUISE DUCROCQ</p>

                {/* Bloc PORTFOLIO + chat */}
                <div className="hero-mark">
                    {/* Lettres en bazar */}
                    <div className="portfolio-letters">
                        <span className="portfolio-letter letter-p">P</span>
                        <span className="portfolio-letter letter-o1">O</span>
                        <span className="portfolio-letter letter-r">R</span>
                        <span className="portfolio-letter letter-t">T</span>
                        <span className="portfolio-letter letter-f">f</span>
                        <span className="portfolio-letter letter-o2">O</span>
                        <span className="portfolio-letter letter-l">L</span>
                        <span className="portfolio-letter letter-i">I</span>
                        <span className="portfolio-letter letter-o3">o</span>
                    </div>

                    {/* Chat au centre */}
                    <Image
                        src="/cleoportfolio1.png"
                        alt="Chat mascotte du portfolio"
                        width={400}
                        height={400}
                        className="hero-cat"
                        priority
                    />
                </div>

                {/* Ligne du bas */}
                <div className="hero-sub">
                    <p className="hero-role">DÉVELOPPEUSE D&apos;APPLICATIONS</p>
                    <p className="hero-year">2025</p>
                </div>
            </div>
        </section>
    );
};

export default Hero;