"use client";

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/theme-button";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export default function Nav() {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex w-full items-center justify-between py-4">
                    <NavigationMenu className="max-w-none">
                        <NavigationMenuList className="gap-6">
                            {navItems.map((item) => (
                                <NavigationMenuItem key={item.name}>
                                    <NavigationMenuLink href={item.href} onClick={(e) => handleClick(e, item.href)} className={cn("text-sm font-medium transition-colors hover:text-primary cursor-pointer")}>
                                        {item.name}
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                    <ModeToggle />
                </div>
            </div>
        </nav>
    );
}
