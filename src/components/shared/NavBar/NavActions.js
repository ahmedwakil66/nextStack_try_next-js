'use client';
import Image from 'next/image';
import React from 'react';
import ThemeToggler from './ThemeToggler';
import NavLink from './NavLink';
import useAuth from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useCart from '@/hooks/useCart';

const NavActions = ({ className }) => {
    const router = useRouter();
    const { user, logOut } = useAuth();
    const { count, totalPrice, isLoading } = useCart();

    const handleLogOut = async () => {
        try {
            await Promise.all([
                logOut(),
                fetch('/api/auth', { method: 'DELETE' })
            ])
            router.refresh();
            toast.success('You are logged out!');
        } catch (error) {
            toast.success(error.message || "Failed to logout! Please try again. ")
        }
    }

    if (!user) {
        return (
            <div className={className}>
                <NavLink
                    href='/sign-in'
                >
                    <button className="btn btn-sm">Login / Sign up</button>
                </NavLink>
            </div>
        )
    }

    return (
        <div className={className}>
            <div className="dropdown dropdown-end">
                { isLoading ? <span className="loading loading-spinner loading-xs"></span>:
                <>
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            <span className="badge badge-sm indicator-item">{count}</span>
                        </div>
                    </label>
                    <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                        <div className="card-body">
                            <span className="font-bold text-lg">{count} Items</span>
                            <span className="text-info">Subtotal: ${totalPrice}</span>
                            <div className="card-actions">
                                <Link href={'/cart'} className="btn btn-primary btn-block btn-sm">View cart</Link>
                            </div>
                        </div>
                    </div>
                </>}
            </div>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-9 rounded-full">
                        <Image src={user.photoURL || "https://res.cloudinary.com/ahmedwakil66/image/upload/v1696049045/profile-pictures/nrfwffe2la7pvfm24t2u.jpg"} alt='' width={40} height={40} />
                    </div>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box border border-gray-600 w-52">
                    <li>
                        <a className="justify-between">
                            Profile
                            <span className="badge">New</span>
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><button onClick={handleLogOut}>Logout</button></li>
                    <li>
                        <ThemeToggler />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NavActions;