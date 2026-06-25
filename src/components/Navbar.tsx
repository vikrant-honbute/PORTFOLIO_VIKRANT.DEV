"use client";

import { useState } from "react";
import { profile } from "@/data/profile";
import ResumePreviewModal from "@/components/ResumePreviewModal";
import Image from "next/image";
import iconImage from "@/app/icon.png";

const navItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [resumeOpen, setResumeOpen] = useState(false);

    return (
        <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/[0.08] bg-white/[0.02] backdrop-blur-xl transition-colors duration-300">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
                <a href="#home" className="group flex items-center gap-3 font-mono-ui text-sm tracking-[0.08em] text-white transition hover:text-white/80 sm:text-base">
                    <Image src={iconImage} alt="Icon" width={30} height={30} className="rounded-md object-cover transition duration-300 group-hover:scale-105" />
                    {profile.brand}
                </a>

                <ul className="hidden items-center gap-5 text-xs uppercase tracking-[0.14em] text-white/75 md:flex">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <a href={item.href} className="transition hover:text-[var(--primary-accent)]">
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setResumeOpen(true)}
                        className="rounded-md border border-[var(--line-border)] bg-[rgba(255,106,0,0.08)] px-3 py-2 text-xs uppercase tracking-[0.1em] text-[var(--foreground)] transition hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)]"
                    >
                        Preview Resume
                    </button>
                    <a
                        href={profile.resumeDownloadUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-md border border-[var(--line-border)] bg-[rgba(255,106,0,0.08)] px-3 py-2 text-xs uppercase tracking-[0.1em] text-[var(--foreground)] transition hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)]"
                    >
                        Download Resume
                    </a>
                </div>
            </div>
            <ResumePreviewModal
                open={resumeOpen}
                onClose={() => setResumeOpen(false)}
                src={profile.resumePreviewUrl}
            />
        </nav>
    );
}