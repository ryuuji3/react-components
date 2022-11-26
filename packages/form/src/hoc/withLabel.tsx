function withLabel<T>(Input: React.ComponentType<T>) {
    function Wrapped({ 
        label, 
        className, 
        inputClassName, 
        textClassName, 
        ...inputProps 
    }: any & LabelProps) {
        // Allow to wrap without forcing them to use the label prop (acts as if it doesn't exist)
        if (!label) {
            return <Input 
                {...inputProps}
                className={className} 
            />
        }

        return (
            <label className={className}>
                <span className={textClassName}>{label}</span>
                <Input {...inputProps} className={inputClassName} />
            </label>
        )
    }

    Wrapped.displayName = Input.displayName || Input.name

    return Wrapped
}

export type LabelProps = {
    label?: React.ReactNode,
    className?: string, // style the container
    inputClassName?: string, // style the input; exposing this to avoid inappropriate familiarity
    textClassName?: string, // style just the text
}

export default withLabel