import { useUser } from "@auth0/nextjs-auth0/client";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import Image from "next/image";
import { DEFAULT_USER } from "@/utils/constants";

const defaultPicture =
    "https://cdn.auth0.com/blog/hello-auth0/auth0-user.png";
export const NavBarButtons = () => {
    const { user } = useUser();

    return (
      <div className="nav-bar__buttons flex gap-4 my-1 ml-2 items-center">
        <h1>{user?.name || DEFAULT_USER}</h1>
        <Image
          title={user?.nickname || DEFAULT_USER}
          src={user?.picture || defaultPicture}
          alt="user image"
          className="w-10 h-10 rounded-full"
          width={38}
          height={38}
        />
        {user ? <LogoutButton /> : <LoginButton /> }
      </div>
    );
  };