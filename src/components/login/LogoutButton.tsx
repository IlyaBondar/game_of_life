import { LinkA } from "../shared/Link";

export const LogoutButton = () => {
    return (
      <LinkA className="button__logout" href="/api/auth/logout">
        Log Out
      </LinkA>
    );
  };