import withField, { FieldProps } from '../hoc/withField'
import NumberInput from './NumberInput'
import TextInput from './TextInput'


enum FieldTypes {
    TEXT = 'text',
    NUMBER = 'number',
}

function Field({ component: Input, ...fieldProps }: Props) {
    if (typeof Input === 'function') {
        return <Input {...fieldProps} />
    }

    switch(Input) {
        case FieldTypes.NUMBER:
            return <NumberInput {...fieldProps} />
        case FieldTypes.TEXT:
        default:
            return <TextInput {...fieldProps} />
    }
}

type Props = FieldProps & { component?: React.ComponentType<FieldProps> | FieldTypes }

export default withField(Field)