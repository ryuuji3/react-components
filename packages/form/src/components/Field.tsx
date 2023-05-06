import withField, { FieldProps } from '../hoc/withField'
import withValidity from '../hoc/withValidity'
import NumberInput from './NumberInput'
import TextInput from './TextInput'
import { InputType } from '../types'

export enum ComponentType {
    TEXT = 'text',
    NUMBER = 'number',
    DROPDOWN = 'dropdown',
    RADIO = 'radio',
    CHECKBOX = 'checkbox',
}

function Field({ component: Input, type, ...fieldProps }: Props) {
    if (typeof Input === 'function') {
        return <Input {...fieldProps} />
    }

    const component = Input ?? getComponentForType(type)
    const componentProps = { ...fieldProps, ...getTypeProps(type) }

    switch(component) {
        case ComponentType.NUMBER:
            return <NumberInput {...componentProps}  />
        case ComponentType.TEXT:
        default:
            return <TextInput {...componentProps} />
    }
}

function getComponentForType(type: InputType): ComponentType {
    switch(type) {
        case InputType.INTEGER:
        case InputType.FLOAT:
            return ComponentType.NUMBER
        case InputType.TEXT:
        default:
            return ComponentType.TEXT
    }
}

function getTypeProps(type: InputType): { [key: string]: any } {
    switch (type) {
        case InputType.INTEGER:
            return { decimalScale: 0, inputMode: 'numeric' }
        case InputType.FLOAT:
            return { inputMode: 'decimal' }
            
        default: return {} // no props to add
    }
}

type Props = FieldProps & { component?: React.ComponentType<FieldProps> | ComponentType } & { type: InputType }

export default withValidity(withField(Field))