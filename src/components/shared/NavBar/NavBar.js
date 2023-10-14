import Image from 'next/image';
import React from 'react';
import ThemeToggler from '@/components/shared/NavBar/ThemeToggler';
import NavRoutes from './NavRoutes';
import NavActions from './NavActions';
import Link from 'next/link';

const NavBar = () => {
    return (
        <div className="bg-base-100">
            <div className='navbar max-w-6xl mx-auto'>
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn p-0 me-4 btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-semibold">
                            <NavRoutes />
                        </ul>
                    </div>
                    <Link href="/" className="normal-case text-xl">NextStack</Link>
                </div>

                <div className="navbar-center hidden lg:flex w-1/2 items-center justify-end">
                    <ul className="menu menu-horizontal px-1 font-semibold">
                        <NavRoutes />
                    </ul>
                    <NavActions />
                </div>

                {/* NAVBAR END PART */}
                <NavActions className="lg:hidden navbar-end" />
            </div>
        </div>
    );
};

export default NavBar;