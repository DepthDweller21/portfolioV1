import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Code, Briefcase, User } from "lucide-react";

export default function Home() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section id="home" className="flex min-h-screen items-center justify-center px-4 pt-20">
                <div className="container mx-auto max-w-4xl text-center">
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
                                I'm a passionate developer with a love for creating elegant solutions to complex problems. With experience in modern web technologies, I bring ideas to life through clean, efficient code.
                            </p>
                            <p className="text-muted-foreground">When I'm not coding, you can find me exploring new technologies, contributing to open source, or sharing knowledge with the developer community.</p>
                        </div>
                        <div>
                            <Briefcase className="mb-4 size-12 text-primary" />
                            <h3 className="mb-4 text-2xl font-semibold">What I Do</h3>
                            <p className="mb-4 text-muted-foreground">I specialize in building full-stack web applications using React, Next.js, and Node.js. I focus on creating responsive, accessible, and performant applications.</p>
                            <p className="text-muted-foreground">My approach combines technical expertise with a keen eye for design, ensuring that every project I work on is both functional and beautiful.</p>
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
                            { category: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
                            { category: "Backend", skills: ["Node.js", "Express", "REST APIs", "GraphQL"] },
                            { category: "Tools", skills: ["Git", "Docker", "CI/CD", "Testing"] },
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
                            <a href="mailto:your.email@example.com">
                                <Mail className="mr-2 size-5" />
                                Email Me
                            </a>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 size-5" />
                                GitHub
                            </a>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
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
