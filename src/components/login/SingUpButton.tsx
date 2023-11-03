import Link from "../shared/Link";

export const SignupButton = () => {
    return (
      <Link className="button__sign-up" href="/api/auth/signup">
        Sign Up
      </Link>
    );
};