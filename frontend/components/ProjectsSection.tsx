"use client";

import React, { useEffect, useState, useCallback } from "react";

interface Project {
    id: string;               // Guid sérialisé en string
    identifier: string;
    title: string;
    shortDescription: string;
    longDescription?: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    images?: string[];        // correspond à Images côté C#
    isFeatured?: boolean;
    createdAt?: string;
}

const API_URL = "http://localhost:5001";
const ProjectsSection: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`${API_URL}/api/Projects`);
                if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
                const data: Project[] = await res.json();
                setProjects(data);
            } catch (e) {
                console.error(e);
                setError("Impossible de charger les projets pour le moment.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const closeModal = useCallback(() => {
        setSelectedProject(null);
    }, []);

    // Fermer avec la touche Échap
    useEffect(() => {
        if (!selectedProject) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeModal();
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [selectedProject, closeModal]);

    return (
        <section id="projects" className="section section-alt">
            <div className="section-inner">
                <h2 className="section-title">Projets</h2>

                {loading && <p className="section-text">Chargement des projets…</p>}
                {error && <p className="section-text error">{error}</p>}

                {!loading && !error && projects.length === 0 && (
                    <p className="section-text">
                        Aucun projet trouvé pour l&apos;instant.
                    </p>
                )}

                <div className="projects-grid">
                    {projects.map((project) => {
                        const hasCardLinks = !!(project.githubUrl || project.liveUrl);
                        const hasCardTech =
                            Array.isArray(project.technologies) &&
                            project.technologies.length > 0;

                        return (
                            <article
                                key={project.id}
                                className="project-card project-card-clickable"
                                onClick={() => setSelectedProject(project)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        setSelectedProject(project);
                                    }
                                }}
                                tabIndex={0}
                                role="button"
                                aria-label={`Voir les détails du projet ${project.title}`}
                            >
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">
                                    {project.shortDescription ??
                                        project.longDescription ??
                                        ""}
                                </p>

                                {hasCardTech && (
                                    <ul className="project-tags">
                                        {project.technologies.map((tech) => (
                                            <li key={tech} className="project-tag">
                                                {tech}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {hasCardLinks && (
                                    <div className="project-links">
                                        {project.githubUrl && (
                                            <span className="project-link">Code</span>
                                        )}
                                        {project.liveUrl && (
                                            <span className="project-link">Live</span>
                                        )}
                                    </div>
                                )}
                            </article>
                        );
                    })}
                </div>
            </div>

            {/* MODAL PROJET */}
            {selectedProject && (
                <div
                    className="project-modal-backdrop"
                    onClick={closeModal}
                    aria-hidden="true"
                >
                    <div
                        className="project-modal"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="project-modal-title"
                    >
                        <button
                            type="button"
                            className="project-modal-close"
                            onClick={closeModal}
                            aria-label="Fermer la fenêtre de détails du projet"
                        >
                            ×
                        </button>

                        <h3
                            id="project-modal-title"
                            className="project-modal-title"
                        >
                            {selectedProject.title}
                        </h3>

                        {/* description = longDescription si dispo, sinon shortDescription */}
                        {(selectedProject.longDescription ||
                            selectedProject.shortDescription) && (
                            <p className="project-modal-description">
                                {selectedProject.longDescription ??
                                    selectedProject.shortDescription}
                            </p>
                        )}

                        {/* Technologies uniquement si la liste n'est pas vide */}
                        {selectedProject.technologies &&
                            selectedProject.technologies.length > 0 && (
                                <div className="project-modal-section">
                                    <h4 className="project-modal-subtitle">
                                        Technologies
                                    </h4>
                                    <ul className="project-tags">
                                        {selectedProject.technologies.map((tech) => (
                                            <li key={tech} className="project-tag">
                                                {tech}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        {/* Images uniquement s'il y en a */}
                        {selectedProject.images &&
                            selectedProject.images.length > 0 && (
                                <div className="project-modal-section">
                                    <h4 className="project-modal-subtitle">
                                        Aperçus
                                    </h4>
                                    <div className="project-modal-images">
                                        {selectedProject.images.map((src, index) => (
                                            <img
                                                key={src + index}
                                                src={src}
                                                alt={`${selectedProject.title} capture ${index + 1}`}
                                                className="project-modal-image"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                        {/* Liens uniquement si au moins un existe */}
                        {(selectedProject.githubUrl || selectedProject.liveUrl) && (
                            <div className="project-modal-section project-modal-links">
                                {selectedProject.githubUrl && (
                                    <a
                                        href={selectedProject.githubUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="project-link"
                                    >
                                        Voir le code
                                    </a>
                                )}
                                {selectedProject.liveUrl && (
                                    <a
                                        href={selectedProject.liveUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="project-link"
                                    >
                                        Voir la démo
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProjectsSection;