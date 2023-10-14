"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ children, href, activeClass="text-blue-500", exact = false, ...props }) => {
    const path = usePathname();
    let isActive = exact ? path === href : path.startsWith(href);

    if (props.className) {
        props.className = validateClassName(props.className, isActive && activeClass)
    } else {
        props.className = validateClassName(isActive ? activeClass : '')
    }

    return (
        <Link
            href={href}
            {...props}
        >
            {children}
        </Link>
    );
};

const validateClassName = (...args) => args.filter(Boolean).join(' ');
export default NavLink;