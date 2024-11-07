"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Dashboard", href: "/dashboard" },

  { name: "Courses", href: "/courses" },
  {
    name: "Exams",
    href: "/exams",
  },
  {
    name: "Reports",
    href: "/reports",
  },
  {
    name: "Registration",
    href: "/register",
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-purple-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-purple-600": pathname === link.href,
              }
            )}
          >
        
            <p className="block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
