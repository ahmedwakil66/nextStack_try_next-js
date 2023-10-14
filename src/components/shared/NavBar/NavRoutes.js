'use client';
import useAuth from "@/hooks/useAuth";
import NavLink from "./NavLink";

const NavRoutes = () => {
    const { user } = useAuth();
    const navDataToRender = user ? loggedInNavData : navDataCore;

    return (
        <>
            {
                navDataToRender.map(({ title, path }) => <li key={path}>
                    <NavLink
                        href={path}
                        exact={path === '/'}
                    >
                        {title}
                    </NavLink>
                </li>)
            }
        </>
    );
};

const navDataCore = [
    {
        title: 'Home',
        path: '/'
    },
    {
        title: 'About',
        path: '/about'
    },
    {
        title: 'Products',
        path: '/products'
    },
]


const loggedInNavData = [
    ...navDataCore,
    {
        title: 'Dashboard',
        path: '/dashboard'
    }
]

export default NavRoutes;