import { useUser } from "@auth0/nextjs-auth0/client";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import { SignupButton } from "./SingUpButton";
import Image from "next/image";

const defaultPicture =
    "https://cdn.auth0.com/blog/hello-auth0/auth0-user.png";
export const NavBarButtons = () => {
    const { user } = useUser();

    return (
      <nav className="nav-bar__buttons flex gap-4 m-1">
        <Image
                src={user?.picture || defaultPicture}
                alt="Profile"
                className="profile__avatar"
                width={38}
                height={38}
            />
        {!user && (
          <>
            <SignupButton />
            <LoginButton />
          </>
        )}
        {user && (
          <>
            <LogoutButton />
          </>
        )}
      </nav>
    );
  };