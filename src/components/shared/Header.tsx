'use client';

import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "../shared/Link";
import { NavBarButtons } from "../login/NavBarButtons";

export default function Header() {
    return (<header className="flex min-w-full justify-around">
        <nav className="flex gap-4 m-1">
            <Link href="/" >Chat</Link>
            <Link href="/game">Game</Link>
        </nav>
        <nav className="">
            <NavBarButtons/>
        </nav>
    </header>)
}