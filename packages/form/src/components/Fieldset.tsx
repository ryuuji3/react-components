function Fieldset({ children }: FieldsetProps) {
    return (
        <fieldset>
            {children}
        </fieldset>
    )
}

interface FieldsetProps {
    children: React.ReactNode,
}

export default Fieldset