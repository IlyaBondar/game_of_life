import clx from 'classnames';
import { default as NextLink } from 'next/link';

export default function Link(props:any) {
    const { className } = props;
    return (<NextLink
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