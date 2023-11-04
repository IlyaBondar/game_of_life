'use client';

import { NavBarButtons } from "../login/NavBarButtons";
import Link from "../shared/Link";

export default function Header() {
    return (<header className="flex min-w-full justify-around">
        <nav className="flex gap-4 m-1">
            <Link href="/" >Chat</Link>
            <Link href="/game">Game</Link>
        </nav>
        <NavBarButtons/>
    </header>)
}