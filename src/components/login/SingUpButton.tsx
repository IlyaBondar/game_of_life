import { LinkA } from "../shared/Link";

export const SignupButton = () => {
    return (
      <LinkA className="button__sign-up" href="/api/auth/signup">
        Sign Up
      </LinkA>
    );
};