"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Courses", href: "/courses" },
  { name: "Exams", href: "/exams" },
  { name: "Reports", href: "/reports" },
  { name: "Registration", href: "/register" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="space-y-1">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-11 items-center gap-2 rounded-lg px-4 text-sm font-medium transition-all duration-200",
              {
                "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 shadow-sm": isActive,
                "text-gray-600 hover:bg-blue-50 hover:text-blue-700": !isActive,
              }
            )}
          >
            <span className={clsx("flex-1", {
              "font-semibold": isActive
            })}>
              {link.name}
            </span>
            {isActive && (
              <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            )}
          </Link>
        );
      })}
    </div>
  );
}