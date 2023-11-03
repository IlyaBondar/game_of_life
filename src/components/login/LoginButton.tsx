import { LinkA } from "../shared/Link";

export const LoginButton = () => {
    return (
      <LinkA className="button__login" href="/api/auth/login">
        Log In
      </LinkA>
    );
};