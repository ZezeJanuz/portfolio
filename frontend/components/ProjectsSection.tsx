"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Project {
    id: string;
    identifier: string;
    title: string;
    shortDescription: string;
    longDescription?: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    images?: string[];
    isFeatured?: boolean;
    createdAt?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const ProjectsSection: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <section id="projects" className="section section-alt">
            <div className="section-inner">
                <h2 className="section-title">Projets</h2>

                {loading && (
                    <p className="section-text">Chargement des projets…</p>
                )}
                {error && <p className="section-text error">{error}</p>}

                {!loading && !error && projects.length === 0 && (
                    <p className="section-text">
                        Aucun projet trouvé pour l&apos;instant.
                    </p>
                )}

                <div className="projects-grid">
                    {projects.map((project) => {
                        const hasCardLinks = !!(
                            project.githubUrl || project.liveUrl
                        );
                        const hasCardTech =
                            Array.isArray(project.technologies) &&
                            project.technologies.length > 0;

                        return (
                            <Link
                                key={project.id}
                                href={`/projects/${project.identifier}`}
                                className="project-card project-card-clickable"
                                aria-label={`Voir les détails du projet ${project.title}`}
                            >
                                <h3 className="project-title">
                                    {project.title}
                                </h3>
                                <p className="project-description">
                                    {project.shortDescription ??
                                        project.longDescription ??
                                        ""}
                                </p>

                                {hasCardTech && (
                                    <ul className="project-tags">
                                        {project.technologies.map((tech) => (
                                            <li
                                                key={tech}
                                                className="project-tag"
                                            >
                                                {tech}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {hasCardLinks && (
                                    <div className="project-links">
                                        {project.githubUrl && (
                                            <span className="project-link">
                                                Code
                                            </span>
                                        )}
                                        {project.liveUrl && (
                                            <span className="project-link">
                                                Live
                                            </span>
                                        )}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;