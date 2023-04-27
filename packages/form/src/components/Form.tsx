import withRecoil from '../hoc/withRecoil'
import useForm, { FieldValues } from '../hooks/useForm'

function Form({ children, onChange, className }: FormProps) {
    useForm({ onChange })

    return (
        <form className={className}>
            {children}
        </form>
    )
}

export interface FormProps {
    children: React.ReactNode,
    onChange?: (values: FieldValues) => void,
    className?: string,
}

export default withRecoil(Form)