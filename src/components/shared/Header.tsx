'use client';

import { NavBarButtons } from "../login/NavBarButtons";
import NavLink from "../shared/Link";

export default function Header() {
    return (<header className="flex w-full max-w-screen-md mx-auto justify-between sticky top-0 bg-black">
        <nav className="flex gap-4 my-1">
            <NavLink href="/" >Chat</NavLink>
            <NavLink href="/game">Game</NavLink>
        </nav>
        <NavBarButtons/>
    </header>)
}