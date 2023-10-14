import SignInForm from "./SignInForm";

const SignInPage = () => {

    return (
        <div className="hero min-h-screen p-2 fixed top-0 left-0 bg-base-200 z-10">
            <div className="w-full max-w-lg shadow-2xl bg-base-100 rounded-lg">
                <h1 className="text-xl pt-5 text-center">Sign In to NextStack</h1>
                <SignInForm />
            </div>
        </div>
    );
};

export default SignInPage;