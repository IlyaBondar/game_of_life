import Link from "next/link";

export default function Footer() {
    return (<header>
        <nav className="flex gap-4 m-1 mx-auto">
            <Link href="/" className='nav-item pointer-events-auto rounded-md border border-indigo-200 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:border-indigo-500'>Chat</Link>
            <Link href="/game" className='nav-item pointer-events-auto rounded-md border border-indigo-200 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:border-indigo-500'>Game</Link>
        </nav>
    </header>)
}