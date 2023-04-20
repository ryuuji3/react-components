function withLabel<T>(Element: React.ComponentType<T>) {
    function Wrapped({ 
        label, 
        className, 
        inputClassName, 
        textClassName, 
        ...elementProps 
    }: any & LabelProps) {
        // Allow to wrap without forcing them to use the label prop (acts as if it doesn't exist)
        if (!label) {
            return <Element 
                {...elementProps}
                className={className} 
            />
        }

        return (
            <label className={className}>
                <span className={textClassName}>{label}</span>
                <Element {...elementProps} className={inputClassName} />
            </label>
        )
    }

    Wrapped.displayName = Element.displayName || Element.name

    return Wrapped
}

export type LabelProps = {
    label?: React.ReactNode,
    className?: string, // style the container
    inputClassName?: string, // style the input; exposing this to avoid inappropriate familiarity
    textClassName?: string, // style just the text
}

export default withLabel