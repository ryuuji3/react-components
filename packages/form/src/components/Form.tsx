import withRecoil from '../hoc/withRecoil'
import useForm from '../hooks/useForm'
import { FieldValues, Form as FormType } from '../types'

function Form({ children, onChange, onSubmit, className }: FormProps) {
    const form = useForm({ onChange })

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault() // don't do an actual form submission
        
        form.submit()

        onSubmit?.(form.fields, form)
    }

    return (
        <form className={className} onSubmit={handleSubmit}>
            {children}
        </form>
    )
}

export interface FormProps {
    children: React.ReactNode,
    onChange?: (values: FieldValues) => void,
    onSubmit?: (values: FieldValues, form: FormType) => void,
    className?: string,
}

export default withRecoil(Form)