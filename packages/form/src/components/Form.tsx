import withRecoil from '../hoc/withRecoil'

function Form({ children }: FormProps) {
    return (
        <form>
            {children}
        </form>
    )
}

interface FormProps {
    children: React.ReactNode,
}

export default withRecoil(Form)