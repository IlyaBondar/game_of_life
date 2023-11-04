import clx from 'classnames';

type ButtonProps = React.ComponentProps<'button'>;

export default function Button(props:ButtonProps) {
    const { className } = props;
    return (<button
        {...props}
        className={clx(
            `pointer-events-auto rounded-md
            border border-indigo-200
            px-3 py-2 text-[0.8125rem] font-semibold leading-5
            text-white hover:border-indigo-500
            disabled:border-gray-100 disabled:text-gray-400`,
            className)}/>
    )
}