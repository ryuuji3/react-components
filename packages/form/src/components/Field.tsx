import React from 'react'
import withField, { FieldProps } from '../hoc/withField'
import TextInput from './TextInput'


enum FieldTypes {
    TEXT = 'text',
}

function Field({ type, ...inputProps }: FieldProps & { type: FieldTypes }) {
    switch(type) {
        case FieldTypes.TEXT:
        default:
            return <TextInput {...inputProps} />
    }
}

export default withField(Field)