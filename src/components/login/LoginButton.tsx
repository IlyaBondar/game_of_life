import Link from "../shared/Link";

export const LoginButton = () => {
    return (
      <Link className="button__login" href="/api/auth/login">
        Log In
      </Link>
    );
};