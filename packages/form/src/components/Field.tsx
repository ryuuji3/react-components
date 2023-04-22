import withField, { FieldProps } from '../hoc/withField'
import NumberInput from './NumberInput'
import TextInput from './TextInput'


enum FieldTypes {
    TEXT = 'text',
    NUMBER = 'number',
}

function Field({ type, children: Input, ...fieldProps }: Props) {
    if (typeof Input === 'function') {
        return <Input {...fieldProps} />
    }

    switch(type) {
        case FieldTypes.NUMBER:
            return <NumberInput {...fieldProps} />
        case FieldTypes.TEXT:
        default:
            return <TextInput {...fieldProps} />
    }
}

type Props = FieldProps & { type?: FieldTypes } & { children?: React.ComponentType<FieldProps> }

export default withField(Field)