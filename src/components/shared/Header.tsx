'use client';

import { NavBarButtons } from "../login/NavBarButtons";
import Link from "../shared/Link";

export default function Header() {
    return (<header className="flex w-full max-w-screen-md mx-auto justify-between">
        <nav className="flex gap-4 my-1">
            <Link href="/" >Chat</Link>
            <Link href="/game">Game</Link>
        </nav>
        <NavBarButtons/>
    </header>)
}