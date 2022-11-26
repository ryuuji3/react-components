function withLabel<T>(Input: React.ComponentType<T>) {
    function Wrapped({ label, ...inputProps }: any & LabelProps) {
        // Allow to wrap without forcing them to use the label prop
        if (!label) {
            return <Input {...inputProps} />
        }

        return (
            <label>
                {label}
                <Input {...inputProps} />
            </label>
        )
    }

    Wrapped.displayName = Input.displayName || Input.name

    return Wrapped
}

export type LabelProps = {
    label?: React.ReactNode,
}

export default withLabel