import clx from 'classnames';
import { default as NextLink } from 'next/link';
import { usePathname } from 'next/navigation';

type NextLinkProps = React.ComponentProps<typeof NextLink>;

export default function NavLink(props:NextLinkProps) {
    const pathname = usePathname();
    const { className, href } = props;
    const isActive = pathname === href;
    return (<NextLink
        {...props}
        className={clx(
            `pointer-events-auto rounded-md
            border border-indigo-200
            px-3 py-2 text-[0.8125rem] font-semibold leading-5
            hover:text-indigo-500
            disabled:border-gray-100 disabled:text-gray-400`,
            isActive ? 'text-indigo-300' : 'text-white',
            className)}/>
    )
}

type AnchorProps = React.ComponentProps<'a'>;

export function LinkA(props:AnchorProps) {
    const { className } = props;
    return (<a
        {...props}
        className={clx(
            `pointer-events-auto rounded-md
            border border-indigo-200
            px-3 py-2 text-[0.8125rem] font-semibold leading-5
            text-white hover:text-indigo-500
            disabled:border-gray-100 disabled:text-gray-400`,
            className)}/>
    )
}