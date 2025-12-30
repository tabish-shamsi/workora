"use client";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Logo from "@/assets/workora-logo.png";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";

type NavLink = {
  name: string;
  href: string;
};

const NavItem = ({ href, name }: NavLink) => {
  const pathname = usePathname();

  return (
    <NavigationMenuItem asChild>
      <NavigationMenuLink
        href={href}
        className={cn(
          "text-gray-900 hover:text-primary text-base font-medium hover:bg-muted",
          pathname === href && "text-primary bg-muted",
        )}
      >
        {name}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const MobileNav = ({ navLinks }: { navLinks: NavLink[] }) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={Logo} // Your Workora icon in /public
              alt="Workora Logo"
              width={32}
              height={32}
            />
            <SheetTitle className="font-semibold text-xl text-gray-900">
              Workora
            </SheetTitle>
          </Link>
        </SheetHeader>

        <NavigationMenu className="flex flex-col gap-8 max-w-full justify-start">
          {navLinks.map((link: NavLink) => (
            <NavItem key={link.name} href={link.href} name={link.name} />
          ))}
        </NavigationMenu>
      </SheetContent>
    </Sheet>
  );
};

export default function Header() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Post Job", href: "/employer/post-job" },
    { name: "Dashboard", href: "/employer/jobs" },
    { name: "Login", href: "/login" },
  ] as NavLink[];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={Logo} // Your Workora icon in /public
              alt="Workora Logo"
              width={32}
              height={32}
            />
            <span className="font-semibold text-xl text-gray-900">Workora</span>
          </Link>

          {/* Navigation Menu */}
          <NavigationMenu className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <NavItem key={link.name} href={link.href} name={link.name} />
            ))}
          </NavigationMenu>

          <MobileNav navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}
