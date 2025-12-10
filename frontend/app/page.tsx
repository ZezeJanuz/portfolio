import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function HomePage() {
    return (
        <div className="app">
            <Navbar />
            <main>
                <Hero />
                <AboutSection />
                <ProjectsSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
}