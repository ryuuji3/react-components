import withRecoil from '../hoc/withRecoil'
import useForm, { FieldValues } from '../hooks/useForm'

function Form({ children, onChange }: FormProps) {
    useForm({ onChange })

    return (
        <form>
            {children}
        </form>
    )
}

interface FormProps {
    children: React.ReactNode,
    onChange?: (values: FieldValues) => void
}

export default withRecoil(Form)