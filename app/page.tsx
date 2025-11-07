"use client";

import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Code, Briefcase, User } from "lucide-react";
import { useEffect, useState } from "react";

type GlowConfig = {
    id: string;
    location: {
        left?: string;
        right?: string;
        top?: string;
        bottom?: string;
    };
    speed: number; // Animation duration in seconds
    color: string; // CSS color value (e.g., "primary", "rgb(59, 130, 246)", "#3b82f6")
    sizeMin: number; // Minimum size in pixels
    sizeMax: number; // Maximum size in pixels
    transparency: number; // 0-1 value (e.g., 0.2 for 20% opacity)
    frequency: number; // Probability of appearing (0-1, e.g., 0.1 = 10%)
};

// Configuration array - add/remove glows by modifying this array
const glowConfigs: GlowConfig[] = [
    {
        id: "glow-1",
        location: { left: "10%", top: "20%" },
        speed: 6,
        color: "primary",
        sizeMin: 0,
        sizeMax: 70,
        transparency: 0.01,
        frequency: 0.8,
    },
    {
        id: "glow-2",
        location: { left: "40%", top: "60%" },
        speed: 6,
        color: "primary",
        sizeMin: 0,
        sizeMax: 70,
        transparency: 0.01,
        frequency: 0.2,
    },
    {
        id: "glow-3",
        location: { left: "70%", top: "20%" },
        speed: 6,
        color: "primary",
        sizeMin: 0,
        sizeMax: 70,
        transparency: 0.01,
        frequency: 0.4,
    }
];

type ActiveGlow = {
    id: string;
    config: GlowConfig;
    startTime: number;
    key: number; // Unique key for re-rendering
};

export default function Home() {
    const [activeGlows, setActiveGlows] = useState<ActiveGlow[]>([]);
    const [primaryColor, setPrimaryColor] = useState<string>("");

    useEffect(() => {
        // Get the computed primary color from CSS variable
        if (typeof window !== "undefined") {
            const root = document.documentElement;
            const computedStyle = getComputedStyle(root);
            const primary = computedStyle.getPropertyValue("--primary").trim() || computedStyle.getPropertyValue("--color-primary").trim();
            setPrimaryColor(primary || "oklch(0.205 0 0)");
        }
    }, []);

    useEffect(() => {
        const checkInterval = 200; // Check every 200ms
        const interval = setInterval(() => {
            setActiveGlows((prev) => {
                const newGlows: ActiveGlow[] = [...prev];

                glowConfigs.forEach((config) => {
                    // Check if this glow should appear based on frequency
                    if (Math.random() < config.frequency) {
                        // Check if this glow is already active
                        const isActive = newGlows.some((glow) => glow.id === config.id);

                        if (!isActive) {
                            // Add new glow
                            const newGlow: ActiveGlow = {
                                id: config.id,
                                config,
                                startTime: Date.now(),
                                key: Date.now(), // Unique key for animation restart
                            };
                            newGlows.push(newGlow);

                            // Remove glow after animation completes
                            setTimeout(() => {
                                setActiveGlows((current) => current.filter((glow) => glow.id !== config.id || glow.key !== newGlow.key));
                            }, config.speed * 1000);
                        }
                    }
                });

                return newGlows;
            });
        }, checkInterval);

        return () => clearInterval(interval);
    }, []);

    const getColorStyle = (color: string, transparency: number) => {
        if (color === "primary") {
            const baseColor = primaryColor || "oklch(0.205 0 0)";
            const oklchMatch = baseColor.match(/oklch\(([^)]+)\)/);
            if (oklchMatch) {
                return {
                    backgroundColor: `oklch(${oklchMatch[1]} / ${transparency})`,
                };
            }
            return {
                backgroundColor: baseColor,
                opacity: transparency,
            };
        }
        if (color.includes("rgb")) {
            return {
                backgroundColor: color.replace("rgb", "rgba").replace(")", `, ${transparency})`),
            };
        }
        if (color.includes("#")) {
            const hex = color.replace("#", "");
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            return {
                backgroundColor: `rgba(${r}, ${g}, ${b}, ${transparency})`,
            };
        }
        return {
            backgroundColor: color,
            opacity: transparency,
        };
    };

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-20">
                {/* Glowing Background Elements */}
                <div className="absolute inset-0 -z-10">
                    {activeGlows.map((activeGlow) => {
                        const { config, key } = activeGlow;
                        const colorStyle = getColorStyle(config.color, config.transparency);

                        // Build position style
                        const positionStyle: React.CSSProperties = {};
                        if (config.location.left) {
                            positionStyle.left = config.location.left;
                        }
                        if (config.location.right) {
                            positionStyle.right = config.location.right;
                        }
                        if (config.location.top) {
                            positionStyle.top = config.location.top;
                        }
                        if (config.location.bottom) {
                            positionStyle.bottom = config.location.bottom;
                        }

                        return (
                            <div
                                key={`${config.id}-${key}`}
                                className="absolute glow-pulse rounded-full blur-3xl"
                                style={
                                    {
                                        ...colorStyle,
                                        ...positionStyle,
                                        "--glow-size-min": `${config.sizeMin}px`,
                                        "--glow-size-max": `${config.sizeMax}px`,
                                        "--glow-speed": `${config.speed}s`,
                                    } as React.CSSProperties & {
                                        "--glow-size-min": string;
                                        "--glow-size-max": string;
                                        "--glow-speed": string;
                                    }
                                }
                            />
                        );
                    })}
                </div>
                <div className="container relative z-10 mx-auto max-w-4xl text-center">
                    <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
                        Hi, I'm <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Muhammad Haris</span>
                    </h1>
                    <p className="mb-8 text-xl text-muted-foreground sm:text-2xl">Full Stack Developer & Creative Problem Solver</p>
                    <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground">I build beautiful, functional web applications with modern technologies. Passionate about creating exceptional user experiences.</p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Button size="lg" asChild>
                            <a href="#projects">View My Work</a>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <a href="#contact">Get In Touch</a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="border-t py-20">
                <div className="container mx-auto max-w-4xl px-4">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-4xl font-bold">About Me</h2>
                        <div className="mx-auto h-1 w-24 bg-primary"></div>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2">
                        <div>
                            <User className="mb-4 size-12 text-primary" />
                            <h3 className="mb-4 text-2xl font-semibold">Who I Am</h3>
                            <p className="mb-4 text-muted-foreground">
                            I'm a developer who believes in building things that last. I care less about trends and more about quality, structure, and reliability.
                            I'm most at home deep in code, optimizing systems, or tinkering with Linux until everything just works the way it should.
                            </p>
                            <p className="text-muted-foreground">When I'm not coding, you can find me exploring new technologies, contributing to open source, or sharing knowledge with the developer community.</p>
                        </div>
                        <div>
                            <Briefcase className="mb-4 size-12 text-primary" />
                            <h3 className="mb-4 text-2xl font-semibold">What I Do</h3>
                            <p className="mb-4 text-muted-foreground">
                                I design and develop full-stack systems — from backend APIs and automation scripts to frontend interfaces and deployment pipelines. My work often bridges software and infrastructure: Node.js and PHP on the backend; with Docker, AWS, and Linux powering the stack underneath.
                            </p>
                            <p className="text-muted-foreground">
                                Whether it's building something from scratch or making existing systems more efficient, I focus on function, maintainability, and simplicity above all.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="border-t bg-muted/30 py-20">
                <div className="container mx-auto max-w-4xl px-4">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-4xl font-bold">Skills & Technologies</h2>
                        <div className="mx-auto h-1 w-24 bg-primary"></div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            { category: "Languages", skills: ["JavaScript", "PHP", "Python", "Golang", "C#", "java"] },
                            { category: "Frontend", skills: ["React", "Next.js", "Tailwind CSS", "Bootstrap", "SSR"] },
                            { category: "Backend", skills: ["Node.js", "Express.js", "REST APIs", "GraphQL", "Bun"] },
                            { category: "DevOps", skills: ["Docker", "AWS", "Azure", "Git", "DigitalOcean"] },
                            { category: "Databases", skills: ["MongoDB", "MySQL", "Firebase", "PostgreSQL"] },
                            { category: "Other", skills: ["Vim", "Linux", "Self-hosted LLMs", "Ricing Ubuntu"] },
                        ].map((group) => (
                            <div key={group.category} className="rounded-lg border bg-card p-6 shadow-sm">
                                <Code className="mb-4 size-8 text-primary" />
                                <h3 className="mb-4 text-xl font-semibold">{group.category}</h3>
                                <ul className="space-y-2">
                                    {group.skills.map((skill) => (
                                        <li key={skill} className="text-muted-foreground">
                                            • {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="border-t py-20">
                <div className="container mx-auto max-w-6xl px-4">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-4xl font-bold">Featured Projects</h2>
                        <div className="mx-auto h-1 w-24 bg-primary"></div>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((project) => (
                            <div key={project} className="group rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-lg">
                                <div className="mb-4 aspect-video rounded-md bg-muted"></div>
                                <h3 className="mb-2 text-xl font-semibold">Project {project}</h3>
                                <p className="mb-4 text-sm text-muted-foreground">A brief description of the project and what technologies were used. This showcases your work and expertise.</p>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline">
                                        View Project
                                    </Button>
                                    <Button size="sm" variant="ghost">
                                        <Github className="size-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="border-t bg-muted/30 py-20">
                <div className="container mx-auto max-w-2xl px-4 text-center">
                    <h2 className="mb-4 text-4xl font-bold">Get In Touch</h2>
                    <div className="mx-auto mb-8 h-1 w-24 bg-primary"></div>
                    <p className="mb-12 text-lg text-muted-foreground">I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.</p>
                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <Button size="lg" variant="outline" asChild>
                            <a href="mailto:muhammadharis571@gmail.com">
                                <Mail className="mr-2 size-5" />
                                Email Me
                            </a>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <a href="https://github.com/DepthDweller21" target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 size-5" />
                                GitHub
                            </a>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <a href="www.linkedin.com/in/haris-lakhani-b38286240" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="mr-2 size-5" />
                                LinkedIn
                            </a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t py-8 text-center text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} Muhammad Haris. All rights reserved.</p>
            </footer>
        </main>
    );
}
