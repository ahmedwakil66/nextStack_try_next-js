'use client';
import useAuth from '@/hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

const SignInForm = () => {
    const { logIn } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    console.log('redirect', searchParams.get('redirect'));

    const handleSignIn = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        if (!email || !password) {
            toast('Email and Password are required!');
            return;
        }
        const toastId = toast.loading('Signing in...')
        try {
            const userCredential = await logIn(email, password);
            if (userCredential.user) {
                toast.dismiss(toastId);
                // get token from server
                await fetch('/api/auth', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ email: userCredential.user.email, uid: userCredential.user.uid })
                })
                // then navigate user to his intended route
                router.push(searchParams.get('redirect') || '/')
            }
        } catch (error) {
            toast.error(error.message || "Sign in failed! Please try again.", { id: toastId })
        }
    }

    return (
        <form onSubmit={handleSignIn} className="card-body">
            <div className="form-control">
                <label className="label" htmlFor='email'>
                    <span className="label-text">Email</span>
                </label>
                <input type="email" name='email' id='email' placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
                <label className="label" htmlFor='password'>
                    <span className="label-text">Password</span>
                </label>
                <input type="password" name='password' id='password' placeholder="password" className="input input-bordered" required />
                {/* <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label> */}
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
            </div>
        </form>
    );
};

export default SignInForm;