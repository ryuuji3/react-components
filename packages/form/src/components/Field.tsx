import withField, { FieldProps } from '../hoc/withField'
import NumberInput from './NumberInput'
import TextInput from './TextInput'


enum FieldTypes {
    TEXT = 'text',
    NUMBER = 'number',
}

function Field({ type, ...inputProps }: FieldProps & { type: FieldTypes }) {
    switch(type) {
        case FieldTypes.NUMBER:
            return <NumberInput {...inputProps} />
        case FieldTypes.TEXT:
        default:
            return <TextInput {...inputProps} />
    }
}

export default withField(Field)