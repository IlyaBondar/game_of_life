import Link from "../shared/Link";

export const LogoutButton = () => {
    return (
      <Link className="button__logout" href="/api/auth/logout">
        Log Out
      </Link>
    );
  };