import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

export function Button({ children, className, ...rest }: ButtonProps) {
    return (
        <button
            {...rest}
            className={clsx(
                'w-full bg-foreground rounded-lg py-2 text-background hover:bg-opacity-90 transition-all disabled:bg-gray-400',
                className
            )}
        >
            {children}
        </button>
    )
}
