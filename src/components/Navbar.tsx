import { profile } from "@/data/profile";

const navItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    return (
        <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
                <a href="#home" className="font-display text-lg tracking-[0.08em] text-white sm:text-xl">
                    {profile.name.toUpperCase()}
                    <span className="ml-2 bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
                        .AI
                    </span>
                </a>

                <ul className="hidden items-center gap-6 text-[11px] uppercase tracking-[0.22em] text-white/70 md:flex">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <a href={item.href} className="transition hover:text-orange-100">
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <a
                    href="#contact"
                    className="rounded-full border border-orange-300/35 bg-orange-500/10 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-orange-100 transition hover:bg-orange-500/20"
                >
                    Hire Me
                </a>
            </div>
        </nav>
    );
}